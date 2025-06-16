import {
  Component,
  contentChildren,
  Directive,
  inject,
  InjectionToken,
  input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';

export const COMMON_ERROR_MAP = new InjectionToken<Record<string, () => Promise<{ default: any }>>>('Map of errors', {
  providedIn: 'root',
  factory: () => ({}),
});

export function provideCommonErrorMap(errors: Record<string, () => Promise<{ default: any }>>) {
  return {
    provide: COMMON_ERROR_MAP,
    useValue: errors,
  };
}

@Component({
  selector: 'app-form-control-errors',
  template: `<ng-container #errorContainer />`,
  styles: [
    `
      :host {
        display: block;
        color: #dc3545;
        margin-top: 0.25rem;
        font-size: 0.875rem;
      }
    `,
  ],
  imports: [],
})
export class FormControlErrorsComponent {
  readonly control = input.required<AbstractControl>();
  readonly errorTemplates = contentChildren(FormControlErrorDirective);

  private readonly viewContainerRef = viewChild.required('errorContainer', { read: ViewContainerRef });

  private readonly errorMap = inject(COMMON_ERROR_MAP);

  constructor() {
    toObservable(this.control)
      .pipe(
        switchMap((control) =>
          control.root.events.pipe(
            startWith(void 0), // Trigger on initial load
            map(() => control),
          ),
        ),
        filter((control) => control.dirty || control.touched),
        map(getFirstErrorKeyFromControlOrParent),
        distinctUntilChanged((previous, current) => previous?.[0] === current?.[0]),
        switchMap(async (errorEntry) => {
          if (errorEntry === undefined) {
            this.viewContainerRef().clear();
            return;
          }

          const [errorKey, errorData] = errorEntry;

          const errorTemplate = this.errorTemplates().find((template) => template.errorKey() === errorKey);
          if (errorTemplate !== undefined) {
            this.viewContainerRef().clear();
            this.viewContainerRef().createEmbeddedView(errorTemplate.template, {
              $implicit: errorData,
            });

            return;
          }

          const errorComponentFn = this.errorMap[errorKey];
          if (errorComponentFn !== undefined) {
            const componentToRender = await errorComponentFn();

            this.viewContainerRef().clear();
            const componentRef = this.viewContainerRef().createComponent(componentToRender.default, {
              injector: this.viewContainerRef().injector,
            });

            componentRef.setInput('error', errorData);

            return;
          }

          this.viewContainerRef().clear();
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}

@Directive({
  selector: 'ng-template[formControlError]',
})
export class FormControlErrorDirective {
  readonly errorKey = input.required<string>({ alias: 'formControlError' });

  readonly template = inject(TemplateRef, { self: true });
}

function getFirstErrorKeyFromControlOrParent(control: AbstractControl): [string, unknown] | undefined {
  if (control.errors !== null) {
    return Object.entries(control.errors)[0];
  }

  if (control.parent) {
    return getFirstErrorKeyFromControlOrParent(control.parent);
  }

  return undefined;
}

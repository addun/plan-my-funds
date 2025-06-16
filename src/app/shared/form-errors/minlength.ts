import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-minlength',
  template: `Provided value must be at least {{ error().requiredLength }} characters long`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MinlengthErrorComponent {
  readonly error = input.required<{ requiredLength: number }>();
}

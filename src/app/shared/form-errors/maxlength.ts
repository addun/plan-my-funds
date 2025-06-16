import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-maxlength',
  template: `Provided value must be at most {{ error().requiredLength }} characters long`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaxlengthErrorComponent {
  readonly error = input.required<{ requiredLength: number }>();
}

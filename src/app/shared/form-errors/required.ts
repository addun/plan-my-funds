import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-required',
  template: `This field is required`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequiredErrorComponent {}

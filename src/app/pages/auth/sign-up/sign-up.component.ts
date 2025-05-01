import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpFeatureService } from '@app/features/auth/sign-up.feature';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private readonly signUpFeatureService = inject(SignUpFeatureService);
  private readonly router = inject(Router);

  protected readonly signUpForm = new FormGroup(
    {
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      repeatPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    },
    { validators: [passwordsMatchValidator] },
  );

  onSubmit() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.signUpFeatureService
      .signUp({
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert('Error signing up'),
      });
  }
}

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  if (group instanceof FormGroup === false) {
    throw new Error('Expected FormGroup');
  }

  const { password, repeatPassword } = group.controls;

  if (!password || !repeatPassword) {
    throw new Error('Password and repeatPassword controls are required');
  }

  const passwordValue = password.value;
  const repeatPasswordValue = repeatPassword.value;

  return passwordValue === repeatPasswordValue ? null : { passwordsMismatch: true };
}

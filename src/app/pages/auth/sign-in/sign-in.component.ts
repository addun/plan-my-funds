import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInFeatureService } from '@app/features/auth/sign-in.feature';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private readonly signInFeatureService = inject(SignInFeatureService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly signInForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  onSubmit() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.signInFeatureService
      .signIn({
        email: this.signInForm.controls.email.value,
        password: this.signInForm.controls.password.value,
      })
      .subscribe({
        next: () => {
          if (this.activatedRoute.snapshot.queryParamMap.get('redirectTo')) {
            const redirectTo = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
            this.router.navigate([redirectTo]);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => alert(`Error sign in: ${error.message}`),
      });
  }
}

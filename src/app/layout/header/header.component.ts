import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from '@app/states/auth';
import { SignOutFeatureService } from '@app/features/auth/sign-out.feature';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly authState = inject(AuthStateService).state;

  private readonly signOutFeatureService = inject(SignOutFeatureService);
  private readonly router = inject(Router);

  signOut() {
    this.signOutFeatureService
      .signOut()
      .pipe(switchMap(() => this.router.navigate(['/'])))
      .subscribe();
  }
}

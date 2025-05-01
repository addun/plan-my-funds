import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthStateService } from '../states/auth';

export const redirectUnauthenticatedToLogin: CanActivateFn = (route, state) => {
  const currentUser = inject(AuthStateService);

  if (currentUser.state().name === 'LOGGED_IN') {
    return true;
  }

  const router = inject(Router);

  return new RedirectCommand(
    router.createUrlTree(['/auth/sign-in'], {
      queryParams: { redirectTo: state.url },
    }),
  );
};

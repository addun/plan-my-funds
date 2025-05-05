import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../states/auth';

export const bearerInterceptorV1Fn: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService).state();

  if (authState.name !== 'LOGGED_IN') {
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authState.user.token}`,
    },
  });

  return next(req);
};

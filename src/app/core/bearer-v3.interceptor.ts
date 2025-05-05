import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../states/auth';

export const ADD_BEARER_TOKEN = new HttpContextToken(() => false);

export const bearerInterceptorV3Fn: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService).state();

  if (req.context.get(ADD_BEARER_TOKEN) && authState.name === 'LOGGED_IN') {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${authState.user.token}`,
        },
      }),
    );
  }

  return next(req);
};

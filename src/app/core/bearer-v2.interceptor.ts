import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStateService } from '../states/auth';

export const bearerInterceptorV2Fn: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService).state();

  if (isUrlOnWhitelist(req.url) && authState.name === 'LOGGED_IN') {
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

function isUrlOnWhitelist(url: string) {
  const whitelist = ['/api/posts'];

  return whitelist.some((whitelistedUrl) => url.startsWith(whitelistedUrl));
}

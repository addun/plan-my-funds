import { Routes } from '@angular/router';
import { redirectAuthenticatedToHome } from '@app/guard/redirect-authenticated-to-home.guard';
import { redirectUnauthenticatedToLogin } from '@app/guard/redirect-unauthenticated-to-login.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/main'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth'),
    canActivate: [redirectAuthenticatedToHome],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard'),
    // canActivate: [redirectUnauthenticatedToLogin],
  },
];

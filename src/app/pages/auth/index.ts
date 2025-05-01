import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up'),
  },
] satisfies Routes;

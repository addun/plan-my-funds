import { Injectable, signal } from '@angular/core';
import { UserDataResponse } from '@app/api/auth';

export interface LoggedInState {
  name: 'LOGGED_IN';
  user: UserDataResponse;
}

export interface LoggedOutState {
  name: 'LOGGED_OUT';
}

export interface NotReadyState {
  name: 'NOT_READY';
}

export type AuthState = LoggedInState | LoggedOutState | NotReadyState;

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  readonly state = signal<AuthState>({ name: 'NOT_READY' });
}

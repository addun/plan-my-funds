import { inject, Injectable } from '@angular/core';
import { AuthApiService, SignInRequest, UserDataResponse } from '@app/api/auth';
import { AuthStateService } from '@app/states/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignInFeatureService {
  private readonly authApiService = inject(AuthApiService);
  private readonly authStateService = inject(AuthStateService);

  signIn(request: SignInRequest): Observable<UserDataResponse> {
    return this.authApiService.signIn(request).pipe(
      tap((response) => {
        this.authStateService.state.set({
          name: 'LOGGED_IN',
          user: response,
        });
      }),
    );
  }
}

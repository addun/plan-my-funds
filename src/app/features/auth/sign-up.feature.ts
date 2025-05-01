import { inject, Injectable } from '@angular/core';
import { AuthApiService, SignInRequest } from '@app/api/auth';
import { map, Observable, tap } from 'rxjs';
import { AuthStateService } from '@app/states/auth';

@Injectable({
  providedIn: 'root',
})
export class SignUpFeatureService {
  private readonly authApiService = inject(AuthApiService);
  private readonly authStateService = inject(AuthStateService);

  signUp(request: SignInRequest): Observable<void> {
    return this.authApiService.signUp(request).pipe(
      tap((response) =>
        this.authStateService.state.set({
          name: 'LOGGED_IN',
          user: response,
        }),
      ),
      map(() => void 0),
    );
  }
}

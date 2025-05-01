import { Injectable, inject } from '@angular/core';
import { AuthApiService } from '@app/api/auth';
import { AuthStateService } from '@app/states/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignOutFeatureService {
  private readonly authApiService = inject(AuthApiService);
  private readonly authStateService = inject(AuthStateService);

  signOut(): Observable<void> {
    return this.authApiService.signOut().pipe(
      tap(() => {
        this.authStateService.state.set({
          name: 'LOGGED_OUT',
        });
      }),
    );
  }
}

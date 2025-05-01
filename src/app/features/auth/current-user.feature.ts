import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '@app/api/auth';
import { AuthStateService } from '@app/states/auth';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserFeature {
  private readonly authApiService = inject(AuthApiService);
  private readonly authStateService = inject(AuthStateService);

  setCurrentUser(): Observable<void> {
    return this.authApiService.currentUser().pipe(
      switchMap(async (currentUser) => {
        if (currentUser === null) {
          this.authStateService.state.set({ name: 'LOGGED_OUT' });
        } else {
          this.authStateService.state.set({
            name: 'LOGGED_IN',
            user: {
              token: await currentUser.getIdToken(),
              userId: currentUser.uid,
            },
          });
        }
      }),
    );
  }
}

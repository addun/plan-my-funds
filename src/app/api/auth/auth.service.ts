import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { defer, map, Observable, switchMap } from 'rxjs';
import { SignInRequest, UserDataResponse } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly auth = inject(Auth);

  signIn(request: SignInRequest): Observable<UserDataResponse> {
    return defer(() => signInWithEmailAndPassword(this.auth, request.email, request.password)).pipe(
      switchMap(async (userCredential) => ({
        userId: userCredential.user.uid,
        token: await userCredential.user.getIdToken(),
      })),
    );
  }

  signUp(request: SignInRequest): Observable<UserDataResponse> {
    return defer(() => createUserWithEmailAndPassword(this.auth, request.email, request.password)).pipe(
      switchMap(async (userCredential) => ({
        userId: userCredential.user.uid,
        token: await userCredential.user.getIdToken(),
      })),
    );
  }

  signOut(): Observable<void> {
    return defer(() => this.auth.signOut());
  }

  currentUser() {
    return defer(() => this.auth.authStateReady()).pipe(map(() => this.auth.currentUser));
  }
}

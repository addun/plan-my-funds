import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { CurrentUserFeature } from '@app/features/auth/current-user.feature';
import { provideCommonErrorMap } from '@app/shared/form-error';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { bearerInterceptorV3Fn } from './core/bearer-v3.interceptor';

export const firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  projectId: environment.FIREBASE_PROJECT_ID,
  storageBucket: environment.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.FIREBASE_APP_ID,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([bearerInterceptorV3Fn])),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAppInitializer(() => inject(CurrentUserFeature).setCurrentUser()),

    provideCommonErrorMap({
      required: () => import('@app/shared/form-errors/required'),
      minlength: () => import('@app/shared/form-errors/minlength'),
      maxlength: () => import('@app/shared/form-errors/maxlength'),
    }),
  ],
};

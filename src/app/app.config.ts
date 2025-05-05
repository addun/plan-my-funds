import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CurrentUserFeature } from '@app/features/auth/current-user.feature';
import { environment } from '../environments/environment';
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
  ],
};

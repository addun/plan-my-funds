import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly firestore = inject(Firestore);

  getUsers(): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
}

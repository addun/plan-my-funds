import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { defer, Observable } from 'rxjs';
import { AccountHistory } from './account-history.models';

@Injectable({
  providedIn: 'root',
})
export class AccountHistoryApiService {
  private readonly firestore = inject(Firestore);
  private readonly accountHistoryCollection = collection(this.firestore, '/account-history');

  getAccountHistory(): Observable<AccountHistory[]> {
    return collectionData(this.accountHistoryCollection, { idField: 'id' }) as Observable<AccountHistory[]>;
  }

  addAccountHistory() {
    return defer(() =>
      addDoc(this.accountHistoryCollection, {
        name: 'Test Account',
        balance: 1000,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}

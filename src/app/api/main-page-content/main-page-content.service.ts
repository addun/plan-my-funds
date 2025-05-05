import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MainPageContent {
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class MainPageContentApiService {
  private readonly httpClient = inject(HttpClient);

  getMainPageContent(): Observable<MainPageContent> {
    return this.httpClient.get<MainPageContent>(`/api/main-page-content`);
  }
}

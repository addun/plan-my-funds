import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_BEARER_TOKEN } from '../../core/bearer-v3.interceptor';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly httpClient = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('/api/posts', {
      context: new HttpContext().set(ADD_BEARER_TOKEN, true),
    });
  }
}

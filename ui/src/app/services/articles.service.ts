import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Article } from '../models/article';

@Injectable()
export class ArticlesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    if (environment.production) {
      return this.http.get(this.apiUrl + '/articles.json');
    } else {
      return this.http.get("./assets/articles.json");
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import {news} from './news-list/news';
import { News } from './news-list/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  BASE_URL = 'http://localhost:8000'

  constructor(
    private http: HttpClient,
  ) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.BASE_URL}/api/news/`);
  }

  getOneNews(id): Observable<News> {
    return this.http.get<News>(`${this.BASE_URL}/api/${id}/news/`)
  }
  getNewsByCategoryId(category_id): Observable<News[]> {
    return this.http.get<News[]>(`${this.BASE_URL}/api/categories/${category_id}/news/`);
  }
  


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  //** PUT: update the onenews on the server */
  updateOneNews (onenews: News): Observable<any> {
    return this.http.put(this.newsUrl, onenews, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateOneNews'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //**POST: add a new onenews to the server */
  addOneNews (onenews: News): Observable<News> {
    return this.http.post<News>(this.newsUrl, onenews, this.httpOptions).pipe(
      catchError(this.handleError<News>('addOneNews'))
    );
  }

  /** DELETE: delete the onenews from the server  */
  deleteOneNews (onenews: News | number): Observable<News> {
    const id = typeof onenews === 'number' ? onenews : onenews.id;
    const url = `${this.newsUrl}/${id}`;

    return this.http.delete<News>(url, this.httpOptions).pipe(
      catchError(this.handleError<News>('deleteOneNews'))
    );
  }
}
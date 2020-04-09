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

  private newsUrl = 'api/news';
  private categoryUrl = 'api/categories';
  private cnewsUrl = 'news';
  constructor(
    private http: HttpClient,
  ) { }

  getOneNews(id: number): Observable<News>  {
    const url = `${this.newsUrl}/${id}`;
    return this.http.get<News>(url).pipe(
      catchError(this.handleError<News>(`getOneNews id=${id}`))
    );
  }

  getNews(): Observable<News[]>  {
    return this.http.get<News[]>(this.newsUrl)
    .pipe(
      catchError(this.handleError<News[]>('getNews', []))
    );
  }

  getNewsByCategoryId(category_id: number): Observable<News[]>  {
    const url = `${this.categoryUrl}/${category_id}/news`;
    return this.http.get<News[]>(url).pipe(
      catchError(this.handleError<News[]>(`getNewsByCategoryId category_id=${category_id}`))
    );
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
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Categories} from './category/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

    private categoryUrl = 'api/categories';

  getCategory(id: number): Observable<Categories> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Categories>(url).pipe(
      catchError(this.handleError<Categories>(`getCategory id=${id}`))
    );
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError<Categories[]>('getCategories', []))
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
}

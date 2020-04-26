import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Categories} from './category/category';
import { News } from './news-list/news';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BASE_URL = 'http://localhost:8000'

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.BASE_URL}/api/categories/`);
  }

  getCategory(id): Observable<Categories> {
    return this.http.get<Categories>(`${this.BASE_URL}/api/categories/${id}/`);
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/categories/${id}/`);
  }

  getNewsList(id): Observable<News[]> {
    return this.http.get<News[]>(`${this.BASE_URL}/api/categories/${id}/news/`);
  }

  // login(username, password): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${this.BASE_URL}/api/login/`, {
  //     username,
  //     password
  //   })

  } 
  

  // getCategories(): Observable<Categories[]> {
  //   return this.http.get<Categories[]>(this.categoryUrl)
  //     .pipe(
  //       catchError(this.handleError<Categories[]>('getCategories', []))
  //     );
  // }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
// private handleError<T> (operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {

//     // TODO: send the error to remote logging infrastructure
//     console.error(error); // log to console instead

//     // TODO: better job of transforming error for user consumption
//     // this.log(`${operation} failed: ${error.message}`);

//     // Let the app keep running by returning an empty result.
//     return of(result as T);
//   };
// }


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  get<T>(controller: string, onError?: any) {
    return this.http.get<T>(this.baseUrl + controller, { headers: this.headers })
      .pipe(
        catchError(error => this.handleError(error, onError))
      );
  }

  post<T>(controller: string, object: any, onError?: any) {
    return this.http.post<T>(this.baseUrl + controller, object, { headers: this.headers })
      .pipe(
        catchError(error => this.handleError(error, onError))
      );
  }

  handleError(error: HttpErrorResponse, callback?: any) {
    console.log(error);
    return throwError(error);
  }
}

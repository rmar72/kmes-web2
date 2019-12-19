import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import {
  InlineResponse200,
  LoginRequest
} from './models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  protected url = 'https://virtserver.swaggerhub.com/Futurex/login/1.0.0/login';

  constructor(private http: HttpClient) {}

  public loginPost(body: LoginRequest): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: environment['SWAGGER_HUB_API_KEY'] || '',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.url, body, { headers });
  }

  public mock401Res(body: LoginRequest): Observable<any> {
    const httpRes = {
      statusCode: 401,
      status: "Unauthorized",
      data: {
        success: false,
        errorMessage: "Your password is incorrect. Please enter the correct password for Identity 1."
      }
    }
    return of(httpRes);
  }
}

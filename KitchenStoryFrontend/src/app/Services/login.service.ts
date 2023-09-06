import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../Components/login/user';

const TOKEN_KEYWORD = 'token';
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  login(credentials: any) {
    return this.http
      .post(`${this.baseUrl}/login`, credentials)
      .pipe(tap((data: any) => this.storeToken(data.token)));
  }

  storeToken(token: any) {
    localStorage.setItem(TOKEN_KEYWORD, token);
    return true;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEYWORD);
    return true;
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEYWORD);
  }

  changePassword(user: User): Observable<Object> {
    return this.http.put<Object>(`${this.baseUrl}/change-password`, user);
  }
}

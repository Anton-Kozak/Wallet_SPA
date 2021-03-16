import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DecodedToken } from '../_model/decodedToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: DecodedToken;
  baseUrl: string = environment.apiUrl + 'auth/';

  // isLoggedIn = new BehaviorSubject<boolean>(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  isLoggedIn = new BehaviorSubject<boolean>(this.getToken() !== null);
  hasWallet = new BehaviorSubject<boolean>(this.checkUserWallet());
  constructor(private http: HttpClient, private router: Router) {}

  register(
    username: string,
    userpass: string,
    role: string
  ): Observable<unknown> {
    return this.http.post(this.baseUrl + 'register', {
      username: username,
      password: userpass,
      role: role
    });
  }

  login(
    username: string,
    userpass: string
  ): Observable<{ token: string; user: unknown }> {
    const date = new Date().toUTCString();
    return this.http
      .post(this.baseUrl + 'login', {
        username: username,
        password: userpass,
        date: date
      })
      .pipe(
        map((response: { token: string; user: unknown }) => {
          if (response) {
            localStorage.setItem('token', response.token);
            this.isLoggedIn.next(true);
            this.hasWallet.next(this.checkUserWallet());
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  getToken(): DecodedToken {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      return this.decodedToken;
    }
    return null;
  }

  checkUserWallet(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
      if (this.getToken().hasWallet === 'true') return true;
      return false;
    }
    return false;
  }

  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}

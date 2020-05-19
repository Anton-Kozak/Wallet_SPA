import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiUrl + "auth/";

  isLoggedIn = new BehaviorSubject<boolean>(false);
  hasWallet = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass }).pipe(map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.isLoggedIn.next(true);
        this.hasWallet.next(this.checkUserWallet());
      }
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.hasWallet.next(false);
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }

  checkLogin() {
    this.isLoggedIn.next(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
    this.hasWallet.next(this.checkUserWallet());
  }

  checkUserWallet() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      if (currentUser.walletID != 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    })
    return isMatch;
  }
}

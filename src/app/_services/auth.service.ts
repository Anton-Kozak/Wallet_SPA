import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiUrl + "auth/"

  constructor(private http: HttpClient) { }

  register(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass });
  }

  login(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass }).pipe(map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
    }));
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }

  checkLogin() {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  checkUserWallet() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.walletID != 0)
    {
      return true; 
    }
    return false;
  }
}

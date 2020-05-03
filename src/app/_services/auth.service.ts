import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = "http://localhost:5000/api/auth/"

  constructor(private http: HttpClient) { }

  register(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass });
  }

  login(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass }).pipe(map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUser = response.user;      
      }
    }));
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  checkLogin(){
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }
}

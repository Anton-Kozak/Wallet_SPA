import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiUrl + "auth/";

  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass }).pipe(map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        this.isLoggedIn.next(true);
      }
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      return this.decodedToken;
    }
    return null;
  }

  checkLogin() {
    this.isLoggedIn.next(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  }

  checkUserWallet() {
    if (this.getToken().hasWallet === "true")
      return true;
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

  //TODO: сделать отдельный сервис для фото
  getPhoto(){
    return this.http.get("http://localhost:5000/api/" + 'photo/' + this.getToken().nameid);
  }

  deletePhoto(){
    return this.http.delete("http://localhost:5000/api/" + 'photo/' + this.getToken().nameid);
  }

}

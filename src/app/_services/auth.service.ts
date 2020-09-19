import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = environment.apiUrl + "auth/";

  // isLoggedIn = new BehaviorSubject<boolean>(!this.jwtHelper.isTokenExpired(localStorage.getItem('token')));
  isLoggedIn = new BehaviorSubject<boolean>(this.getToken() !== null);
  hasWallet = new BehaviorSubject<boolean>(this.checkUserWallet());
  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, userpass: string, role: string) {
    return this.http.post(this.baseUrl + 'register', { username: username, password: userpass, role: role });
  }

  login(username: string, userpass: string) {
    let date = new Date().toUTCString();
    return this.http.post(this.baseUrl + 'login', { username: username, password: userpass, date: date }).pipe(map((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        this.isLoggedIn.next(true);
        this.hasWallet.next(this.checkUserWallet());
      }
      return response;
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

  checkUserWallet() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      if (this.getToken().hasWallet === "true")
        return true;
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

  //TODO: сделать отдельный сервис для фото
  getPhoto() {
    return this.http.get("http://localhost:5000/api/" + 'photo/' + this.getToken().nameid);
  }

  addPhoto(photo: any) {
    return this.http.post("http://localhost:5000/api/" + 'photo/' + this.getToken().nameid, photo);
  }

  deletePhoto() {
    return this.http.delete("http://localhost:5000/api/" + 'photo/' + this.getToken().nameid);
  }

}

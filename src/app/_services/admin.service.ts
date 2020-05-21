import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = environment.apiUrl + 'admin/';


  constructor(private http: HttpClient, private authService: AuthService) { }


  getUsers(){
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUsers');
  }

  removeUser(userId: string){
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/removeUser/' + userId, {}, {responseType: 'text'});
  }

}

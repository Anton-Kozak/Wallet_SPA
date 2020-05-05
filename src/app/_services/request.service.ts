import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl: string = environment.apiUrl + "request/"

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  createInviteRequest(email: string){
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/request/' + email, {});
  }

}

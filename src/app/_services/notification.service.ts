import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  baseUrl: string = environment.apiUrl + 'notification/';
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  getNotifications(){
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getNotifications');
  }


  deleteNotifications(){
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid + '/deleteNotification');
  }

}

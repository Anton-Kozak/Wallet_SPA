import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl + 'notification/';
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  getNotifications(){
    return this.http.get(this.baseUrl + this.user.id + '/getNotifications');
  }

}

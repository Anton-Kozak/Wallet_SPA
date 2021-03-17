import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/_model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl: string = environment.apiUrl + 'notification/';
  value: boolean;
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.baseUrl}${this.authService.getToken().nameid}/getNotifications`
    );
  }

  deleteNotifications(): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}${this.authService.getToken().nameid}/deleteNotification`,
      {}
    );
  }
}

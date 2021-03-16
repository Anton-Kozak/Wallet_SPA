import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Request } from 'src/app/_model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl: string = environment.apiUrl + 'request/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createRequestForAccess(email: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${this.authService.getToken().nameid}'/request/'${email}`,
      {},
      { responseType: 'text' }
    );
  }

  getRequests(userId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}${userId}'/getRequests'`);
  }

  acceptRequest(email: string, userId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${userId}'/acceptRequest/'${email}`,
      {},
      { responseType: 'text' }
    );
  }

  declineRequest(email: string): Observable<string> {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/decline/' + email,
      {},
      { responseType: 'text' }
    );
  }
}

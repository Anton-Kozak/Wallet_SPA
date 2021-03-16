import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invite } from '../_model/invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  baseUrl: string = environment.apiUrl + 'invite/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  checkInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/getInvites'`
    );
  }

  createInvite(email: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${this.authService.getToken().nameid}'/invite/'${email}`,
      {},
      { responseType: 'text' }
    );
  }

  accept(walletId: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }'/accept/'${walletId}`,
      {},
      { responseType: 'text' }
    );
  }

  decline(walletId: number): Observable<string> {
    return this.http.post(
      this.baseUrl +
        this.authService.getToken().nameid +
        '/decline/' +
        walletId,
      {},
      { responseType: 'text' }
    );
  }
}

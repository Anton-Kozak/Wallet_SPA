import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  baseUrl: string = environment.apiUrl + 'invite/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  checkInvites() {
    return this.http.get(
      this.baseUrl + this.authService.getToken().nameid + '/getInvites'
    );
  }

  createInvite(email: string) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/invite/' + email,
      {},
      { responseType: 'text' }
    );
  }

  accept(walletId: number) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/accept/' + walletId,
      {},
      { responseType: 'text' }
    );
  }

  decline(walletId: number) {
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

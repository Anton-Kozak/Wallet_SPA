import { Injectable } from '@angular/core';
import { Wallet } from '../_model/wallet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  baseUrl: string = environment.apiUrl + "wallet/";



  createNewWallet(walletToCreate: Wallet) {
    console.log(walletToCreate);
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/createwallet', walletToCreate);
  }

  getCurrentWallet(userId: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getCurrentWallet');
  }

  editWallet(userId: string, wallet: Wallet) {
    return this.http.put(this.baseUrl + this.authService.getToken().nameid + '/editWallet', wallet, { responseType: 'text' });
  }

}

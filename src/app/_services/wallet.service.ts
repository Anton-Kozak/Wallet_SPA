import { Injectable } from '@angular/core';
import { Wallet } from '../_model/wallet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {User} from '../_model/user';



@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.apiUrl + "wallet/";
  currentUser: User;

  

  createNewWallet(walletToCreate: Wallet){
    console.log(walletToCreate);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post(this.baseUrl + this.currentUser.id + '/createwallet', walletToCreate);
  }

  getCurrentWallet(userId: string){
    return this.http.get(this.baseUrl + userId + '/getCurrentWallet');
  }

  editWallet(userId: string, wallet: Wallet){
    return this.http.put(this.baseUrl + userId + '/editWallet', wallet, {responseType: 'text'});
  }
}

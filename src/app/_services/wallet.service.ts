import { Injectable } from '@angular/core';
import { Wallet } from '../_model/wallet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {User} from '../_model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Accept': 'application/json'
  })
};


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
}

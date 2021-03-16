import { Injectable } from '@angular/core';
import { Wallet } from '../_model/wallet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CategoryData } from '../_model/categoryData';
import { UserForProfileEdit } from '../_model/user-for-profile-edit';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  baseUrl: string = environment.apiUrl + 'wallet/';

  walletCategories: CategoryData[] = [];

  currentCategories: CategoryData[] = [];

  getAllCategories() {
    return this.http.get(
      environment.apiUrl +
        'expense/' +
        this.authService.getToken().nameid +
        '/getAllCategories'
    );
  }

  createNewWallet(walletToCreate: Wallet) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/createwallet',
      walletToCreate
    );
  }

  // getCurrentWallet() {
  //   this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getCurrentWallet').subscribe((currentWallet: Wallet) => {
  //     this.currentWallet = currentWallet;
  //     return currentWallet;
  //   });
  // }

  getCurrentWallet() {
    return this.http.get(
      this.baseUrl + this.authService.getToken().nameid + '/getCurrentWallet'
    );
  }

  getWalletsCategories() {
    return this.http.get<CategoryData[]>(
      this.baseUrl + this.authService.getToken().nameid + '/getWalletCategories'
    );
  }

  editWallet(walletToEdit: Wallet) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/editWallet',
      walletToEdit,
      { responseType: 'text' }
    );
  }

  addCategoriesToWallet(categories: number[]) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/addCategories',
      categories
    );
  }

  getProfileData() {
    return this.http.get(
      this.baseUrl + this.authService.getToken().nameid + '/profile'
    );
  }

  updateUserProfile(editUser: UserForProfileEdit) {
    return this.http.post(
      this.baseUrl + this.authService.getToken().nameid + '/updateProfile',
      editUser,
      { responseType: 'text' }
    );
  }
}

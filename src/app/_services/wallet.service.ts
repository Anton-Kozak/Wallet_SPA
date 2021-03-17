import { Injectable } from '@angular/core';
import { Wallet } from '../_model/wallet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CategoryData } from '../_model/categoryData';
import { UserForProfileEdit } from '../_model/user-for-profile-edit';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../_model/applicationUser';
import { ProfileData } from '../_model/profile-data';
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  baseUrl: string = environment.apiUrl + 'wallet/';

  walletCategories: CategoryData[] = [];

  currentCategories: CategoryData[] = [];

  getAllCategories(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(
      `${environment.apiUrl}'expense/'${
        this.authService.getToken().nameid
      }'/getAllCategories'`
    );
  }
  //todo: зачем возвращать здесь юзера с бека?
  createNewWallet(walletToCreate: Wallet): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/createwallet'`,
      walletToCreate
    );
  }

  getCurrentWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/getCurrentWallet'`
    );
  }

  getWalletsCategories(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }'/getWalletCategories'`
    );
  }

  editWallet(walletToEdit: Wallet): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${this.authService.getToken().nameid}'/editWallet'`,
      walletToEdit,
      { responseType: 'text' }
    );
  }

  addCategoriesToWallet(categories: number[]): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/addCategories'`,
      categories
    );
  }

  getProfileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(
      `${this.baseUrl}${this.authService.getToken().nameid}'/profile'`
    );
  }

  updateUserProfile(editUser: UserForProfileEdit): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${this.authService.getToken().nameid}'/updateProfile'`,
      editUser,
      { responseType: 'text' }
    );
  }
}

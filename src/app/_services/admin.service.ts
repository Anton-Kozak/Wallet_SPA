import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ExpenseForTable } from '../_model/expense_models/expense-for-table';
import { Observable } from 'rxjs';
import { UserForAdmin } from '../_model/user_models/user-for-admin';
import { ExpenseForAdminTable } from '../_model/expense_models/expense-for-admin-table';
import { Expense } from '../_model/expense_models/expense';
import { ProfileData } from '../_model/data_models/profile-data';
import { UserForProfileEdit } from '../_model/user_models/user-for-profile-edit';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = environment.apiUrl + 'admin/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<UserForAdmin[]> {
    return this.http.get<UserForAdmin[]>(
      `${this.baseUrl}${this.authService.getToken().nameid}/getUsers`
    );
  }

  removeUser(userId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/removeUser/${userId}`,
      {},
      { responseType: 'text' }
    );
  }

  getAllExpenses(): Observable<ExpenseForAdminTable[]> {
    return this.http.get<ExpenseForAdminTable[]>(
      `${this.baseUrl}${this.authService.getToken().nameid}/getExpensesData`
    );
  }

  onExpenseDelete(id: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}
        ${this.authService.getToken().nameid}
        /expenseDelete/
        ${id}`,
      {},
      { responseType: 'text' }
    );
  }

  onExpenseEdit(
    expenseToEdit: ExpenseForTable
  ): Observable<Expense | ExpenseForTable> {
    return this.http.post<Expense | ExpenseForTable>(
      `${this.baseUrl}${this.authService.getToken().nameid}/expenseEdit/${
        expenseToEdit.id
      }`,
      expenseToEdit
    );
  }

  makeUserPremium(userToMakeId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/makePremium/${userToMakeId}`,
      {},
      { responseType: 'text' }
    );
  }
  removePremiumStatus(userToRemoveId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/removePremium/${userToRemoveId}`,
      {},
      { responseType: 'text' }
    );
  }

  blockUser(userToBlockId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/blockUser/${userToBlockId}`,
      {},
      { responseType: 'text' }
    );
  }
  unblockUser(userToUnblockId: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/unblockUser/${userToUnblockId}`,
      {},
      { responseType: 'text' }
    );
  }
  getProfileData(userToEditId: string): Observable<ProfileData> {
    return this.http.get<ProfileData>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/profile/${userToEditId}`
    );
  }
  updateUserProfile(
    editUser: UserForProfileEdit,
    editUserId: string
  ): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/updateProfile/${editUserId}`,
      editUser,
      { responseType: 'text' }
    );
  }

  getTest(): Observable<number> {
    return this.http
      .get<number>(this.baseUrl + this.authService.getToken().nameid + '/test')
      .pipe(throttleTime(2000));
  }
}

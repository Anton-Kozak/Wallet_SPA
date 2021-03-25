import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ExpenseForTable } from '../_model/expense_models/expense-for-table';
import { Observable } from 'rxjs';
import { UserForAdmin } from '../_model/user_models/user-for-admin';
import { ExpenseForAdminTable } from '../_model/expense_models/expense-for-admin-table';
import { Expense } from '../_model/expense_models/expense';

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
      `${this.baseUrl}
        ${this.authService.getToken().nameid}
        /expenseEdit/
        ${expenseToEdit.id}`,
      expenseToEdit
    );
  }
}

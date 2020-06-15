import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ExpenseForTable } from '../_model/expense-for-table';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = environment.apiUrl + 'admin/';


  constructor(private http: HttpClient, private authService: AuthService) { }


  getUsers(){
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUsers');
  }

  removeUser(userId: string){
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/removeUser/' + userId, {}, {responseType: 'text'});
  }

  getAllExpenses(){
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getExpensesData');
  }

  onExpenseDelete(id: number) {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid + '/expenseDelete/' + id, { responseType: 'text' });
  }

  onExpenseEdit(expenseToEdit: ExpenseForTable) {
    return this.http.put(this.baseUrl + this.authService.getToken().nameid + '/expenseEdit/' + expenseToEdit.id, expenseToEdit, { responseType: 'text' })
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl: string = environment.apiUrl + 'expense/';

  constructor(private http: HttpClient) { }
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  showAllExpenses(){
    return this.http.get(this.baseUrl + this.user.id);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
import { Expense } from '../_model/expense';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl: string = environment.apiUrl + 'expense/';

  initialExpenses: any[] = [];
  foodExpenses: Expense[] = [];
  houseExpenses: Expense[] = [];
  entertainmentExpenses: Expense[] = [];

  expenses: Expense[] = [];
  foodSubject = new Subject<Expense[]>();
  houseSubject = new Subject<Expense[]>();
  entSubject = new Subject<Expense[]>();

  constructor(private http: HttpClient) { }
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  showAllExpenses() {
    this.http.get(this.baseUrl + this.user.id).subscribe((expenses: any) => {
      //this.expenses = expenses;
      this.initialExpenses = expenses;
      this.getFoodExpenses();
      this.getHouseExpenses();
      this.getEntertainmentExpenses();
      //this.expenseSubject.next(this.expenses);
    });
  }

  getFoodExpenses() {
    this.foodExpenses = this.initialExpenses['food'];
    this.foodSubject.next(this.foodExpenses);
  }

  getHouseExpenses() {
    this.houseExpenses = this.initialExpenses['housekeeping'];
    this.houseSubject.next(this.houseExpenses);
  }

  getEntertainmentExpenses() {
    this.entertainmentExpenses = this.initialExpenses['entertainment'];
    this.entSubject.next(this.entertainmentExpenses);
  }



  createExpense(expense: Expense) {
    this.http.post(this.baseUrl + this.user.id + '/new', expense).subscribe((newExpense: Expense) => {
      switch (newExpense.expenseCategoryId) {
        case 1:
          this.houseExpenses.push(newExpense);
          this.houseSubject.next(this.houseExpenses);
          break;
        case 2:
          this.entertainmentExpenses.push(newExpense);
          this.entSubject.next(this.entertainmentExpenses);
          break;
        case 3:
          this.foodExpenses.push(newExpense);
          this.foodSubject.next(this.foodExpenses);
          break;
      }
    });
  }





}

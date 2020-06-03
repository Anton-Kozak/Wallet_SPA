import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
import { Expense } from '../_model/expense';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseForTable } from '../_model/expense-for-table';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl: string = environment.apiUrl + 'expense/';

  initialExpenses: any[] = [];
  foodExpenses: Expense[] = [];
  houseExpenses: Expense[] = [];
  entertainmentExpenses: Expense[] = [];
  clothesExpenses: Expense[] = [];
  otherExpenses: Expense[] = [];

  expenses: Expense[] = [];
  foodSubject = new Subject<Expense[]>();
  houseSubject = new Subject<Expense[]>();
  entSubject = new Subject<Expense[]>();
  clothesSubject = new Subject<Expense[]>();
  otherSubject = new Subject<Expense[]>();
  expensesSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService) {

  }
  showAllExpenses() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid).subscribe((expenses: any) => {
      if (expenses != null) {
        this.initialExpenses = expenses;
        this.getFoodExpenses();
        this.getHouseExpenses();
        this.getEntertainmentExpenses();
        this.getOtherExpenses();
        this.getClothesExpenses();
      }
    });
  }

  getPreviousExpenses() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid + '/previousExpenses').subscribe((expenses: any) => {
      if (expenses != null) {
        this.initialExpenses = expenses;
        this.getFoodExpenses();
        this.getHouseExpenses();
        this.getEntertainmentExpenses();
        this.getOtherExpenses();
        this.getClothesExpenses();
      }
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

  getClothesExpenses() {
    this.clothesExpenses = this.initialExpenses['clothes'];
    this.clothesSubject.next(this.clothesExpenses);
  }

  getOtherExpenses() {
    this.otherExpenses = this.initialExpenses['other'];
    this.otherSubject.next(this.otherExpenses);
  }

  getBarExpensesData() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/barExpenses');
  }

  //TODO: здесь идет система автоматического добавления расходов, нужно подумать как их добавлять на деле
  createExpense(expense: Expense) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/new', expense).pipe(map(response => {
      var newExpense: Expense = response['expense'];
      switch (newExpense.expenseCategoryId) {
        case 1:
          this.foodExpenses.push(newExpense);
          this.foodSubject.next(this.foodExpenses);
          break;
        case 2:
          this.houseExpenses.push(newExpense);
          this.houseSubject.next(this.houseExpenses);
          break;
        case 3:
          this.clothesExpenses.push(newExpense);
          this.clothesSubject.next(this.clothesExpenses);
          break;
        case 4:
          this.entertainmentExpenses.push(newExpense);
          this.entSubject.next(this.entertainmentExpenses);
          break;
        case 5:
          this.otherExpenses.push(newExpense);
          this.otherSubject.next(this.otherExpenses);
          break;
      }
      this.expensesSubject.next(this.expensesSubject.getValue() + newExpense.moneySpent);
      return response;
    }));
  }

  getWalletStatistics() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedStatistics');
  }


  getCategoryStatistics(categoryId: number) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedCategoryStatistics/' + categoryId)
  }


  getCategoryExpenses(categoryId: number) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getCategoryExpenses/' + categoryId);
  }

  getUserStatistics(id: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedUserStatistics/' + id);
  }

  getUserExpenses(id: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUserExpenses/' + id);
  }


  onExpenseDelete(id: number) {
    return this.http.delete(this.baseUrl + this.authService.getToken().nameid + '/expenseDelete/' + id, { responseType: 'text' });
  }

  onExpenseEdit(expenseToEdit: ExpenseForTable) {
    return this.http.put(this.baseUrl + this.authService.getToken().nameid + '/expenseEdit/' + expenseToEdit.id, expenseToEdit, { responseType: 'text' })
  }

  getWalletData(userId: string) {
    return this.http.get(this.baseUrl + userId + '/getNameAndLimit').pipe(map(data => {
      this.expensesSubject.next(data['monthlyExpenses']);
      return data
    }));
  }




}

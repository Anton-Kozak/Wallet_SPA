import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from '../_model/expense';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseForTable } from '../_model/expense-for-table';
import { AuthService } from './auth.service';
import { CategoryData } from '../_model/categoryData';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl: string = environment.apiUrl + 'expense/';

  initialExpenses: any[] = [];
  // foodExpenses: Expense[] = [];
  // houseExpenses: Expense[] = [];
  // entertainmentExpenses: Expense[] = [];
  // clothesExpenses: Expense[] = [];
  // otherExpenses: Expense[] = [];

  // expenses: Expense[] = [];
  // foodSubject = new Subject<Expense[]>();
  // houseSubject = new Subject<Expense[]>();
  // entSubject = new Subject<Expense[]>();
  // clothesSubject = new Subject<Expense[]>();
  // otherSubject = new Subject<Expense[]>();
  expensesSubject = new BehaviorSubject<number>(0);

  categories: number[] = [];
  categoryTitles: CategoryData[] = [];
  firstSubject = new Subject<Expense[]>();
  firstTitle: string = '';
  secondSubject = new Subject<Expense[]>();
  thirdSubject = new Subject<Expense[]>();
  fourthSubject = new Subject<Expense[]>();
  fifthSubject = new Subject<Expense[]>();

  firstExpenses: Expense[] = [];
  secondExpenses: Expense[] = [];
  thirdExpenses: Expense[] = [];
  fourthExpenses: Expense[] = [];
  fifthExpenses: Expense[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.categoryTitles = [
      { id: 1, title: 'Food' },
      { id: 2, title: 'Housekeeping' },
      { id: 3, title: 'Clothes' },
      { id: 4, title: 'Entertainment' },
      { id: 5, title: 'Other' },
      { id: 6, title: 'Beauty' },
      { id: 7, title: 'Sport' },
    ]
  }

  getAllCategories() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getAllCategories').subscribe((data: CategoryData[]) => {
      this.categoryTitles = data;
    })
  }

  showAllExpenses() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid).subscribe((expenses: any[]) => {
      if (expenses != null) {
        let index = 0;
        for (const key in expenses) {
          if (expenses.hasOwnProperty(key)) {
            //name of category
            this.categories[index++] = +key;
          }
        }
        console.log('cat');
        
        console.log(this.categories);
        
        this.firstExpenses = expenses[this.categories[0]];
        this.firstSubject.next(this.firstExpenses);
        this.secondExpenses = expenses[this.categories[1]];
        this.secondSubject.next(this.secondExpenses);
        this.thirdExpenses = expenses[this.categories[2]];
        this.thirdSubject.next(this.thirdExpenses);
        this.fourthExpenses = expenses[this.categories[3]];
        this.fourthSubject.next(this.fourthExpenses);
        this.fifthExpenses = expenses[this.categories[4]];
        this.fifthSubject.next(this.fifthExpenses);
      }
    });
  }

  getPreviousExpenses() {
    this.http.get(this.baseUrl + this.authService.getToken().nameid + '/previousExpenses').subscribe((expenses: any) => {
      if (expenses != null) {
        this.initialExpenses = expenses;
      }
    });
  }

  getBarExpensesData() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/barExpenses');
  }

  //TODO: здесь идет система автоматического добавления расходов, нужно подумать как их добавлять на деле
  createExpense(expense: Expense) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/new', expense).pipe(map(response => {
      var newExpense: Expense = response['expense'];
      switch (newExpense.expenseCategoryId) {
        case this.categories[0]:
          this.firstExpenses.push(newExpense);
          this.firstSubject.next(this.firstExpenses);
          break;
        case this.categories[1]:
          this.secondExpenses.push(newExpense);
          this.secondSubject.next(this.secondExpenses);
          break;
        case this.categories[2]:
          this.thirdExpenses.push(newExpense);
          this.thirdSubject.next(this.thirdExpenses);
          break;
        case this.categories[3]:
          this.fourthExpenses.push(newExpense);
          this.fourthSubject.next(this.fourthExpenses);
          break;
        case this.categories[4]:
          this.fifthExpenses.push(newExpense);
          this.fifthSubject.next(this.fifthExpenses);
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

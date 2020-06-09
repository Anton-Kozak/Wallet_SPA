import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from '../_model/expense';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseForTable } from '../_model/expense-for-table';
import { AuthService } from './auth.service';
import { CategoryData } from '../_model/categoryData';
import { ExpensesWithCategories } from '../_model/expensesWithCategories';
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

  firstExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  secondExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  thirdExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fourthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fifthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
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
    return this.http.get(this.baseUrl + this.authService.getToken().nameid).subscribe((expenses: ExpensesWithCategories[]) => {

      if (expenses != null) {     

        this.firstExpenses.expenses = expenses[0]['expenses'];
        this.firstExpenses.categoryId = expenses[0]['categoryId'];
        this.firstExpenses.categoryName = expenses[0]['categoryName'];
        this.firstSubject.next(this.firstExpenses.expenses);

        this.secondExpenses.expenses = expenses[1]['expenses'];
        this.secondExpenses.categoryId = expenses[1]['categoryId'];
        this.secondExpenses.categoryName = expenses[1]['categoryName'];
        this.secondSubject.next(this.secondExpenses.expenses);

        this.thirdExpenses.expenses = expenses[2]['expenses'];
        this.thirdExpenses.categoryId = expenses[2]['categoryId'];
        this.thirdExpenses.categoryName = expenses[2]['categoryName'];
        this.thirdSubject.next(this.thirdExpenses.expenses);

        this.fourthExpenses.expenses = expenses[3]['expenses'];
        this.fourthExpenses.categoryId = expenses[3]['categoryId'];
        this.fourthExpenses.categoryName = expenses[3]['categoryName'];
        this.fourthSubject.next(this.fourthExpenses.expenses);

        this.fifthExpenses.expenses = expenses[4]['expenses'];
        this.fifthExpenses.categoryId = expenses[4]['categoryId'];
        this.fifthExpenses.categoryName = expenses[4]['categoryName'];
        this.fifthSubject.next(this.fifthExpenses.expenses);
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
        case this.firstExpenses.categoryId:
          this.firstExpenses.expenses.push(newExpense);
          this.firstSubject.next(this.firstExpenses.expenses);
          break;
        case this.secondExpenses.categoryId:
          this.secondExpenses.expenses.push(newExpense);
          this.secondSubject.next(this.secondExpenses.expenses);
          break;
        case this.thirdExpenses.categoryId:
          this.thirdExpenses.expenses.push(newExpense);
          this.thirdSubject.next(this.thirdExpenses.expenses);
          break;
        case this.fourthExpenses.categoryId:
          this.fourthExpenses.expenses.push(newExpense);
          this.fourthSubject.next(this.fourthExpenses.expenses);
          break;
        case this.fifthExpenses.categoryId:
          this.fifthExpenses.expenses.push(newExpense);
          this.fifthSubject.next(this.fifthExpenses.expenses);
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

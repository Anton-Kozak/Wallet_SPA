import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Expense } from '../_model/expense_models/expense';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseForTable } from '../_model/expense_models/expense-for-table';
import { AuthService } from './auth.service';
import { CategoryData } from '../_model/data_models/categoryData';
import { ExpensesWithCategories } from '../_model/expense_models/expensesWithCategories';
import { DetailedWalletStatisticsDTO } from '../_model/data_models/detailedWalletStatisticsDTO';
import { DetailedCategoryStatisticsDTO } from '../_model/data_models/detailedCategoryStatisticsDTO';
import { DetailedUserStatisticsDTO } from '../_model/data_models/detailedUserStatisticsDTO';
import { WalletForPage } from '../_model/wallet-for-page';
import { SpecifiedMonthsData } from '../_model/data_models/specifiedMonthsData';
import { ExpenseWithMessage } from '../_model/expense_models/expenseWithMessage';
import { PreviousData } from '../_model/data_models/previousData';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl: string = environment.apiUrl + 'expense/';

  //initialExpenses: any[] = [];
  expensesSubject = new BehaviorSubject<number>(0);

  categoryTitles = new Subject<CategoryData[]>();

  private expenseSubjects = new Subject<ExpensesWithCategories[]>();
  private allExpenses: ExpensesWithCategories[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExpenseSubjectsAsObservable(): Observable<ExpensesWithCategories[]> {
    return this.expenseSubjects.asObservable();
  }

  showAllExpenses(): Subscription {
    return this.http
      .get(this.baseUrl + this.authService.getToken().nameid)
      .subscribe((expenses: ExpensesWithCategories[]) => {
        if (expenses != null) {
          // const tempArrayWithSubjectExpenses: ExpensesWithCategories[] = [];
          // for (let i = 0; i < expenses.length; i++) {
          //   const expWithCategory: ExpensesWithCategories = {
          //     categoryId: expenses[i]['categoryId'],
          //     categoryName: expenses[i]['categoryName'],
          //     expenses: expenses[i]['expenses']
          //   };
          //   categories.push({
          //     id: expWithCategory.categoryId,
          //     title: expWithCategory.categoryName
          //   });
          //   tempArrayWithSubjectExpenses.push(expWithCategory);
          // }
          const categories: CategoryData[] = [];
          expenses.map((category: ExpensesWithCategories) => {
            categories.push({
              id: category.categoryId,
              title: category.categoryName
            });
          });
          this.allExpenses = [...expenses];
          this.expenseSubjects.next(expenses);
          this.categoryTitles.next(categories);
        } else console.log('Nothing has been found');
      });
  }

  showDailyExpenses(date: string): Observable<ExpenseForTable[]> {
    return this.http.get<ExpenseForTable[]>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/dailyExpenses/${date}`
    );
  }

  getPreviousExpenses(date: string): Observable<PreviousData> {
    return this.http.get<PreviousData>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/previousExpenses/${date}`
    );
  }

  createExpense(expense: Expense): Observable<ExpenseWithMessage> {
    return this.http
      .post<ExpenseWithMessage>(
        this.baseUrl + this.authService.getToken().nameid + '/new',
        expense
      )
      .pipe(
        map((response) => {
          const receivedExpense: ExpenseForTable = response.expense;
          const currentExpenses = this.allExpenses;
          //находим массив с нужной категорий расходов, и добавляем туда созданый расход
          const index = currentExpenses.findIndex(
            (exp) => exp.categoryId == expense.expenseCategoryId
          );
          currentExpenses[index].expenses.push(receivedExpense);
          this.expenseSubjects.next(currentExpenses);
          this.expensesSubject.next(
            this.expensesSubject.getValue() + receivedExpense.moneySpent
          );
          return response;
        })
      );
  }

  getWalletStatistics(date: string): Observable<DetailedWalletStatisticsDTO> {
    return this.http.get<DetailedWalletStatisticsDTO>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/detailedStatistics/${date}`
    );
  }

  getCategoryStatistics(
    categoryId: number,
    date: string
  ): Observable<DetailedCategoryStatisticsDTO> {
    return this.http.get<DetailedCategoryStatisticsDTO>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/detailedCategoryStatistics/${categoryId}/${date}`
    );
  }

  getUserStatistics(
    id: string,
    date: string
  ): Observable<DetailedUserStatisticsDTO> {
    return this.http.get<DetailedUserStatisticsDTO>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/detailedUserStatistics/${id}/${date}`
    );
  }

  getUserExpenses(id: string, date: string): Observable<ExpenseForTable[]> {
    return this.http.get<ExpenseForTable[]>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/getUserExpenses/${id}/${date}`
    );
  }

  onExpenseDelete(id: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/expenseDelete/${id}`,
      {},
      { responseType: 'text' }
    );
  }

  onExpenseEdit(expenseToEdit: ExpenseForTable): Observable<ExpenseForTable> {
    console.log('|', this.authService.getToken().nameid, '|');

    return this.http.post<ExpenseForTable>(
      `${this.baseUrl}${this.authService.getToken().nameid}/expenseEdit/
      ${expenseToEdit.id}`,
      expenseToEdit
    );
  }

  getWalletData(userId: string): Observable<WalletForPage> {
    return this.http
      .get<WalletForPage>(`${this.baseUrl}${userId}/getNameAndLimit`)
      .pipe(
        map((data: WalletForPage) => {
          this.expensesSubject.next(data.monthlyExpenses);
          return data;
        })
      );
  }

  getSpecifiedMonthsData(
    firstMonth: string,
    secondMonth: string
  ): Observable<SpecifiedMonthsData> {
    return this.http.get<SpecifiedMonthsData>(
      `${this.baseUrl}${
        this.authService.getToken().nameid
      }/specificMonthsData/${firstMonth}/${secondMonth}`
    );
  }
}

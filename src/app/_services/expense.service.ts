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
  expensesSubject = new BehaviorSubject<number>(0);

  categoryTitles = new Subject<CategoryData[]>();

  private expenseSubjects = new Subject<ExpensesWithCategories[]>();
  private allExpenses: ExpensesWithCategories[] = [];



  constructor(private http: HttpClient, private authService: AuthService) {
  }


  getExpenseSubjectsAsObservable() {
    return this.expenseSubjects.asObservable();
  }



  showAllExpenses() {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid).subscribe((expenses: ExpensesWithCategories[]) => {
      if (expenses != null) {
        console.log('We get to subject filling' + expenses.length);
        let tempArrayWithSubjectExpenses: ExpensesWithCategories[] = [];
        var categoriesCount = 0;
        let categories: CategoryData[] = [];
        for (let i = 0; i < expenses.length; i++) {
          let expWithCategory: ExpensesWithCategories = {
            categoryId: expenses[i]['categoryId'],
            categoryName: expenses[i]['categoryName'],
            expenses: expenses[i]['expenses']
          };
          categoriesCount++;
          categories.push({ id: expWithCategory.categoryId, title: expWithCategory.categoryName });
          tempArrayWithSubjectExpenses.push(expWithCategory);
        }
        this.allExpenses = [...tempArrayWithSubjectExpenses];
        this.expenseSubjects.next(tempArrayWithSubjectExpenses);
  
        this.categoryTitles.next(categories);
      }
      else
        console.log('Nothing has been found');
    });
  }

  showDailyExpenses(date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/dailyExpenses/' + date);
  }

  getPreviousExpenses(date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/previousExpenses/' + date);
  }


  createExpense(expense: Expense) {
    return this.http.post<ExpenseForTable>(this.baseUrl + this.authService.getToken().nameid + '/new', expense).pipe(map(response => {
      const receivedExpense: ExpenseForTable = response['expense'];
      let currentExpenses = this.allExpenses;
      //находим массив с нужной категорий расходов, и добавляем туда созданый расход
      const index = currentExpenses.findIndex(exp => exp.categoryId == expense.expenseCategoryId);
      currentExpenses[index].expenses.push(receivedExpense);
      this.expenseSubjects.next(currentExpenses);
      this.expensesSubject.next(this.expensesSubject.getValue() + receivedExpense.moneySpent);
      return response;
    }));
  }

  getWalletStatistics(date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedStatistics/' + date);
  }


  getCategoryStatistics(categoryId: number, date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedCategoryStatistics/' + categoryId + '/' + date)
  }


  getUserStatistics(id: string, date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/detailedUserStatistics/' + id + '/' + date);
  }

  getUserExpenses(id: string, date: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/getUserExpenses/' + id + '/' + date);
  }


  onExpenseDelete(id: number) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/expenseDelete/' + id, {}, { responseType: 'text' });
  }

  onExpenseEdit(expenseToEdit: ExpenseForTable) {
    return this.http.post(this.baseUrl + this.authService.getToken().nameid + '/expenseEdit/' + expenseToEdit.id, expenseToEdit)
  }

  getWalletData(userId: string) {
    return this.http.get(this.baseUrl + userId + '/getNameAndLimit').pipe(map(data => {
      this.expensesSubject.next(data['monthlyExpenses']);
      return data
    }));
  }


  getSpecifiedMonthsData(firstMonth: string, secondMonth: string) {
    return this.http.get(this.baseUrl + this.authService.getToken().nameid + '/specificMonthsData/' + firstMonth + '/' + secondMonth);
  }
}

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

  // firstSubject = new Subject<ExpenseForTable[]>();
  // secondSubject = new Subject<ExpenseForTable[]>();
  // thirdSubject = new Subject<ExpenseForTable[]>();
  // fourthSubject = new Subject<ExpenseForTable[]>();
  // fifthSubject = new Subject<ExpenseForTable[]>();
  // sixthSubject = new Subject<ExpenseForTable[]>();
  // seventhSubject = new Subject<ExpenseForTable[]>();
  // eightthSubject = new Subject<ExpenseForTable[]>();
  // ninethSubject = new Subject<ExpenseForTable[]>();
  // tenthSubject = new Subject<ExpenseForTable[]>();

  private expenseSubjects = new Subject<ExpensesWithCategories[]>();
  private allExpenses: ExpensesWithCategories[] = [];

  // firstExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // secondExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // thirdExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // fourthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // fifthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // sixthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // seventhExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // eightthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // ninethExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // tenthExpenses: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  getExpenseSubjectsAsObservable() {
    return this.expenseSubjects.asObservable();
  }



  showAllExpenses() {
    console.log('test');
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
        //old approach with 10 subjects
        if (true) {
          // this.expenseSubjects.subscribe(expenseGroup => {
          //   console.log(expenseGroup + ' Category name!');
          //   expenseGroup.forEach(exp=>{
          //     exp.expenses.
          //   })
          // })
          //console.log(expenses);

          // this.firstExpenses.expenses = expenses[0]['expenses'];
          // this.firstExpenses.categoryId = expenses[0]['categoryId'];
          // this.firstExpenses.categoryName = expenses[0]['categoryName'];
          // this.firstSubject.next(this.firstExpenses.expenses);


          // this.secondExpenses.expenses = expenses[1]['expenses'];
          // this.secondExpenses.categoryId = expenses[1]['categoryId'];
          // this.secondExpenses.categoryName = expenses[1]['categoryName'];
          // this.secondSubject.next(this.secondExpenses.expenses);
          // categoriesCount++;
          // categories.push({ id: this.secondExpenses.categoryId, title: this.secondExpenses.categoryName });

          // this.thirdExpenses.expenses = expenses[2]['expenses'];
          // this.thirdExpenses.categoryId = expenses[2]['categoryId'];
          // this.thirdExpenses.categoryName = expenses[2]['categoryName'];
          // this.thirdSubject.next(this.thirdExpenses.expenses);
          // categoriesCount++;
          // categories.push({ id: this.thirdExpenses.categoryId, title: this.thirdExpenses.categoryName });

          // this.fourthExpenses.expenses = expenses[3]['expenses'];
          // this.fourthExpenses.categoryId = expenses[3]['categoryId'];
          // this.fourthExpenses.categoryName = expenses[3]['categoryName'];
          // this.fourthSubject.next(this.fourthExpenses.expenses);
          // categoriesCount++;
          // categories.push({ id: this.fourthExpenses.categoryId, title: this.fourthExpenses.categoryName });

          // this.fifthExpenses.expenses = expenses[4]['expenses'];
          // this.fifthExpenses.categoryId = expenses[4]['categoryId'];
          // this.fifthExpenses.categoryName = expenses[4]['categoryName'];
          // this.fifthSubject.next(this.fifthExpenses.expenses);
          // categoriesCount++;
          // categories.push({ id: this.fifthExpenses.categoryId, title: this.fifthExpenses.categoryName });

          // if (categoriesCount < expenses.length) {
          //   this.sixthExpenses.expenses = expenses[5]['expenses'];
          //   this.sixthExpenses.categoryId = expenses[5]['categoryId'];
          //   this.sixthExpenses.categoryName = expenses[5]['categoryName'];
          //   this.sixthSubject.next(this.sixthExpenses.expenses);
          //   categoriesCount++;
          //   categories.push({ id: this.sixthExpenses.categoryId, title: this.sixthExpenses.categoryName });
          // }
          // if (categoriesCount < expenses.length) {
          //   this.seventhExpenses.expenses = expenses[6]['expenses'];
          //   this.seventhExpenses.categoryId = expenses[6]['categoryId'];
          //   this.seventhExpenses.categoryName = expenses[6]['categoryName'];
          //   this.seventhSubject.next(this.seventhExpenses.expenses);
          //   categoriesCount++;
          //   categories.push({ id: this.seventhExpenses.categoryId, title: this.seventhExpenses.categoryName });
          // }
          // if (categoriesCount < expenses.length) {
          //   this.eightthExpenses.expenses = expenses[7]['expenses'];
          //   this.eightthExpenses.categoryId = expenses[7]['categoryId'];
          //   this.eightthExpenses.categoryName = expenses[7]['categoryName'];
          //   this.eightthSubject.next(this.eightthExpenses.expenses);
          //   categoriesCount++;
          //   categories.push({ id: this.eightthExpenses.categoryId, title: this.eightthExpenses.categoryName });
          // }
          // if (categoriesCount < expenses.length) {
          //   this.ninethExpenses.expenses = expenses[8]['expenses'];
          //   this.ninethExpenses.categoryId = expenses[8]['categoryId'];
          //   this.ninethExpenses.categoryName = expenses[8]['categoryName'];
          //   this.ninethSubject.next(this.ninethExpenses.expenses);
          //   categoriesCount++;
          //   categories.push({ id: this.ninethExpenses.categoryId, title: this.ninethExpenses.categoryName });
          // }
          // if (categoriesCount < expenses.length) {
          //   this.tenthExpenses.expenses = expenses[9]['expenses'];
          //   this.tenthExpenses.categoryId = expenses[9]['categoryId'];
          //   this.tenthExpenses.categoryName = expenses[9]['categoryName'];
          //   this.tenthSubject.next(this.tenthExpenses.expenses);
          //   categoriesCount++;
          //   categories.push({ id: this.tenthExpenses.categoryId, title: this.tenthExpenses.categoryName });
          // }
        }
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
      //console.log('Reeived expense: ' + JSON.stringify(response), 'sent expense:', expense);
      const receivedExpense: ExpenseForTable = response['expense'];
      let currentExpenses = this.allExpenses;
      const index = currentExpenses.findIndex(exp => exp.categoryId == expense.expenseCategoryId);
      currentExpenses[index].expenses.push(receivedExpense);
      this.expenseSubjects.next(currentExpenses);
      //old approach with 10 subjects
      if (true) {
        /* switch (+(expense.expenseCategoryId)) {
          case this.firstExpenses.categoryId:
            this.firstExpenses.expenses.push(receivedExpense);
            this.firstSubject.next(this.firstExpenses.expenses);
            break;
          case this.secondExpenses.categoryId:
            this.secondExpenses.expenses.push(receivedExpense);
            this.secondSubject.next(this.secondExpenses.expenses);
            break;
          case this.thirdExpenses.categoryId:
            this.thirdExpenses.expenses.push(receivedExpense);
            this.thirdSubject.next(this.thirdExpenses.expenses);
            break;
          case this.fourthExpenses.categoryId:
            this.fourthExpenses.expenses.push(receivedExpense);
            this.fourthSubject.next(this.fourthExpenses.expenses);
            break;
          case this.fifthExpenses.categoryId:
            this.fifthExpenses.expenses.push(receivedExpense);
            this.fifthSubject.next(this.fifthExpenses.expenses);
            break;
          case this.sixthExpenses.categoryId:
            this.sixthExpenses.expenses.push(receivedExpense);
            this.sixthSubject.next(this.sixthExpenses.expenses);
            break;
          case this.seventhExpenses.categoryId:
            this.seventhExpenses.expenses.push(receivedExpense);
            this.seventhSubject.next(this.seventhExpenses.expenses);
            break;
          case this.eightthExpenses.categoryId:
            this.eightthExpenses.expenses.push(receivedExpense);
            this.eightthSubject.next(this.eightthExpenses.expenses);
            break;
          case this.ninethExpenses.categoryId:
            this.ninethExpenses.expenses.push(receivedExpense);
            this.ninethSubject.next(this.ninethExpenses.expenses);
            break;
          case this.tenthExpenses.categoryId:
            this.tenthExpenses.expenses.push(receivedExpense);
            this.tenthSubject.next(this.tenthExpenses.expenses);
            break;
        }      
        */
      }
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

import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Expense } from 'src/app/_model/expense';
import { AuthService } from 'src/app/_services/auth.service';
import { WalletForPage } from 'src/app/_model/wallet-for-page';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/_model/notification';
import { NotificationService } from 'src/app/_services/notification.service';
import { ExpensesWithCategories } from 'src/app/_model/expensesWithCategories';

@Component({
  selector: 'app-show-wallet-table',
  templateUrl: './show-wallet-table.component.html',
  styleUrls: ['./show-wallet-table.component.css']
})
export class ShowWalletTableComponent implements OnInit {

  constructor(private expenseService: ExpenseService,
    private authService: AuthService,
    public dialog: MatDialog,
    private noteService: NotificationService) { }
  first: ExpensesWithCategories = {categoryTitle: '', expenses: []};
  second: ExpensesWithCategories = {categoryTitle: '', expenses: []};
  third: ExpensesWithCategories = {categoryTitle: '', expenses: []};
  fourth: ExpensesWithCategories = {categoryTitle: '', expenses: []};
  fifth: ExpensesWithCategories = {categoryTitle: '', expenses: []};
  walletTitle: string;
  walletLimit: number;
  walletExpenses: number;
  type: string;
  private id;
  expensesToShow: number;
  notifications: Notification[] = [];

  ngOnInit(): void {
    this.id = this.authService.getToken().nameid;
    this.expenseService.getWalletData(this.id).subscribe((walletData: WalletForPage) => {
      this.walletTitle = walletData['title'];
      this.expenseService.expensesSubject.subscribe(expData => {
        this.walletExpenses = expData;
        this.expensesToShow = expData;
        console.log(this.walletExpenses);
        this.checkLimit();
      })
      this.walletLimit = walletData['monthlyLimit'];
      this.checkLimit();
    });
    this.expenseService.showAllExpenses();
    this.expenseService.firstSubject.subscribe(exp => {
      this.first.expenses = exp;
      this.first.categoryTitle = this.expenseService.categoryTitles[this.expenseService.categories[0] - 1].title;     
    });
    this.expenseService.secondSubject.subscribe(exp => {
      this.second.expenses = exp;
      this.second.categoryTitle = this.expenseService.categoryTitles[this.expenseService.categories[1] - 1].title; 
    });
    this.expenseService.thirdSubject.subscribe(exp => {
      this.third.expenses = exp;
      this.third.categoryTitle = this.expenseService.categoryTitles[this.expenseService.categories[2] - 1].title;    
    });
    this.expenseService.fourthSubject.subscribe(exp => {
      this.fourth.expenses = exp;
      this.fourth.categoryTitle = this.expenseService.categoryTitles[this.expenseService.categories[3] - 1].title;  
    });
    this.expenseService.fifthSubject.subscribe(exp => {
      this.fifth.expenses = exp;
      this.fifth.categoryTitle = this.expenseService.categoryTitles[this.expenseService.categories[4] - 1].title;    
    });

    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    })
  }

  checkLimit() {
    if (this.walletLimit != 0) {
      this.expensesToShow = this.walletExpenses;

      if (this.walletExpenses < 0.25 * this.walletLimit) {
        this.type = 'success';
      } else if (this.walletExpenses < 0.5 * this.walletLimit) {
        this.type = 'info';
      } else if (this.walletExpenses < 0.75 * this.walletLimit) {
        this.type = 'warning';
      } else if (this.walletExpenses < 0.90 * this.walletLimit) {
        this.type = 'danger';
      }
      else if (this.walletExpenses >= this.walletLimit) {
        this.expensesToShow = this.walletLimit;
        this.type = 'danger';
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateExpenseComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showNotifications() {
    this.notifications.forEach(element => {
      console.log(element.message);
    });
    this.noteService.deleteNotifications().subscribe(() => {
      console.log('Success');

    })
  }
}

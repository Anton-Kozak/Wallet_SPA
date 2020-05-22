import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/_model/expense';
import { AuthService } from 'src/app/_services/auth.service';
import { WalletForPage } from 'src/app/_model/wallet-for-page';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/_model/notification';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-show-wallet-table',
  templateUrl: './show-wallet-table.component.html',
  styleUrls: ['./show-wallet-table.component.css']
})
export class ShowWalletTableComponent implements OnInit {

  constructor(private expenseService: ExpenseService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private noteService: NotificationService) { }
  foodExpenses: Expense[] = [];
  houseExpenses: Expense[] = [];
  entExpenses: Expense[] = [];
  clothesExpenses: Expense[] = [];
  otherExpenses: Expense[] = [];
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
        this.checkLimit();
      })
      this.walletLimit = walletData['monthlyLimit'];
      this.checkLimit();
    });




    this.expenseService.showAllExpenses();
    this.expenseService.foodSubject.subscribe(exp => {
      this.foodExpenses = exp;
    });
    this.expenseService.entSubject.subscribe(exp => {
      this.entExpenses = exp;
    });
    this.expenseService.houseSubject.subscribe(exp => {
      this.houseExpenses = exp;
    });
    this.expenseService.clothesSubject.subscribe(exp => {
      this.clothesExpenses = exp;
    });
    this.expenseService.otherSubject.subscribe(exp => {
      this.otherExpenses = exp;
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
      } else if (this.walletExpenses < 0.95 * this.walletLimit) {
        this.type = 'danger';
      }
      else if (this.walletExpenses >= this.walletLimit) {
        this.expensesToShow = this.walletLimit;
        this.type = 'danger';
      }
    }
  }

  checkRequests() {
    this.router.navigate(['/checkRequests']);
  }

  createInvite() {
    this.router.navigate(['/createInvite']);
  }

  showGraph() {
    this.router.navigate(['/graph']);
  }

  // createExpense() {
  //   this.router.navigate(['/createExpense']);
  // }


  showWalletStatistics() {
    this.router.navigate(['/getWalletStatistics']);
  }

  categoryStatistics() {
    this.router.navigate(['/catstat'], { queryParams: { category: 1 } });
  }

  userStat() {
    this.router.navigate(['/userStatistics', this.id]);
  }

  editWallet() {
    this.router.navigate(['/editWallet']);
  }

  walletAdmin() {
    this.router.navigate(['/walletAdmin']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateExpenseComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showNotifications(){
    this.notifications.forEach(element => {
      console.log(element.message);
    });
    this.noteService.deleteNotifications().subscribe(()=>{
      console.log('Success');
      
    })
  }

}

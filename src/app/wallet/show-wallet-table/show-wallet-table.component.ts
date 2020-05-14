import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/_model/expense';

@Component({
  selector: 'app-show-wallet-table',
  templateUrl: './show-wallet-table.component.html',
  styleUrls: ['./show-wallet-table.component.css']
})
export class ShowWalletTableComponent implements OnInit {

  constructor(private expenseService: ExpenseService, private router: Router) { }
  foodExpenses: Expense[] = [];
  houseExpenses: Expense[] = [];
  entExpenses: Expense[] = [];
  clothesExpenses: Expense[] = [];
  otherExpenses: Expense[] = [];

  ngOnInit(): void {
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

  createExpense() {
    this.router.navigate(['/createExpense']);
  }


  showWalletStatistics() {
    this.router.navigate(['/getWalletStatistics']);
  }

  categoryStatistics() {
    this.router.navigate(['/catstat'], { queryParams: { category: 1 } });
  }

  userStat(){
    this.router.navigate(['/userStatistics']);
  }

}

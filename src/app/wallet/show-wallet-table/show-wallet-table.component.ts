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

  ngOnInit(): void {
    this.expenseService.showAllExpenses();
    this.expenseService.foodSubject.subscribe(exp=>{
      this.foodExpenses = exp;
    });
    this.expenseService.entSubject.subscribe(exp=>{
      this.entExpenses = exp;
    });
    this.expenseService.houseSubject.subscribe(exp=>{
      this.houseExpenses = exp;
    });
  }

  checkRequests(){
    this.router.navigate(['/checkRequests']);
  }

  createInvite(){
    this.router.navigate(['/createInvite']);
  }

}

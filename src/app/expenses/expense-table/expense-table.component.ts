import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Expense } from 'src/app/_model/expense';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {

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
    this.router.navigate(['/getrequests']);
  }

  

}

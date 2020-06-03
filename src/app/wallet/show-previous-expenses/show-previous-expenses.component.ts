import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Expense } from 'src/app/_model/expense';


@Component({
  selector: 'app-show-previous-expenses',
  templateUrl: './show-previous-expenses.component.html',
  styleUrls: ['./show-previous-expenses.component.css']
})
export class ShowPreviousExpensesComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }

  foodExpenses: Expense[] = [];
  houseExpenses: Expense[] = [];
  entExpenses: Expense[] = [];
  clothesExpenses: Expense[] = [];
  otherExpenses: Expense[] = [];

  ngOnInit(): void {
    this.expenseService.getPreviousExpenses();
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

}

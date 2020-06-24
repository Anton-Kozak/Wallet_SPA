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
  }

}

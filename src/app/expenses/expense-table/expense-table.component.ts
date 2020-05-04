import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Expense } from 'src/app/_model/expense';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {

  constructor(private expenseService: ExpenseService) { }
  expenses: Expense[] = [];

  ngOnInit(): void {
    this.expenseService.showAllExpenses().subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
    },error=>{
      console.log(error);
      
    })
  }

}

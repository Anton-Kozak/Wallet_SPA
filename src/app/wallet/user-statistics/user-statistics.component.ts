import { Component, OnInit } from '@angular/core';
import { ExpenseList } from 'src/app/_model/expense-list';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService, private authService: AuthService, private route: ActivatedRoute) { }

  //@Input

  spentAll: number;
  avgDailyExpenses: number;
  amountOfMoneySpent: number;
  barExpenses: ExpenseList;
  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  mostSpentCategory: string;
  mostUsedCategory: string;
  lastSixMonths: LastMonthStat[];
  expenses: ExpenseForTable[] = [];
  private id;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    

    this.expService.getUserStatistics(this.id).subscribe(response=>{
      this.avgDailyExpenses = response['averageDailyExpense'];
      this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
      this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
      this.barExpenses = response['barExpenses'];
      this.lastSixMonths = response['lastSixMonths'];
      this.mostUsedCategory = response['mostUsedCategory'];
      this.mostSpentCategory = response['mostSpentCategory'];
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
    })

    this.expService.getUserExpenses(this.id).subscribe((data: ExpenseForTable[]) => {
      this.expenses = data;
    })
  }

  

}

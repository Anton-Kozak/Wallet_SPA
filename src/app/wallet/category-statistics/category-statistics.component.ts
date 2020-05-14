import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { CategoryComparison } from 'src/app/_model/category-comparison';
import { ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/_model/expense';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';

@Component({
  selector: 'app-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.css']
})
export class CategoryStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService, private route: ActivatedRoute) { }
  chosenCategory: number;
  chosenCategoryName: string;

  largestExpense: number;
  currentMonthLargestExpense: number;
  spentThisMonth: number;
  spentAll: number;

  compareBarExpenses: CategoryComparison;
  mostSpentUser: TopUsersStat;
  //here sum is count
  mostUsedUser: TopUsersStat;
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];

  expenses: ExpenseForTable[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['category']);

      this.chosenCategory = +params['category'] || 0;
      switch (this.chosenCategory) {
        case 1:
          this.chosenCategoryName = "Food"
          break;
        case 2:
          this.chosenCategoryName = "Housekeeping"
          break;
        case 3:
          this.chosenCategoryName = "Clothes"
          break;
        case 4:
          this.chosenCategoryName = "Entertainment"
          break;
        case 5:
          this.chosenCategoryName = "Other"
          break;
        default:
          this.chosenCategoryName = "Category not found"
          break;
      }
    });
    this.expService.getCategoryStatistics(this.chosenCategory).subscribe(data => {
      this.largestExpense = data['largestExpense'];
      this.currentMonthLargestExpense = data['currentMonthLargestExpense'];
      this.mostSpentUser = data['mostSpentUser'];
      this.mostUsedUser = data['mostUsedUser'];
      this.compareBarExpenses = data['barCompareExpensesWithLastMonth'];
      this.spentThisMonth = data['spentThisMonth'];
      this.spentAll = data['spentAll'];
      this.topFiveUsers = data['topFiveUsers'];
      this.lastSixMonths = data['lastSixMonths'];
      console.log(data);
    });

    this.expService.getCategoryExpenses(this.chosenCategory).subscribe((data: ExpenseForTable[]) => {
      this.expenses = data;
    })
  }

}

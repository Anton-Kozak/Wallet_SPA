import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { CategoryComparison } from 'src/app/_model/category-comparison';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/_model/expense';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';

@Component({
  selector: 'app-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.css']
})
export class CategoryStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute,
    private walletService: WalletService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  largestExpense: number;
  currentMonthLargestExpense: number;
  spentThisMonth: number;
  spentAll: number;

  chosenCategory: number;
  chosenCategoryName: string;

  compareBarExpenses: CategoryComparison;
  mostSpentUser: TopUsersStat;
  //here sum is count
  mostUsedUser: TopUsersStat;
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];

  expenses: ExpenseForTable[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.walletService.getCurrentWallet();
      this.chosenCategory = +params['id'] || 0;
      this.route.data.subscribe((data:CategoryData[]) => {
        this.chosenCategoryName = data['categories'].find(x=> x.id === this.chosenCategory).title;
      })
      
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

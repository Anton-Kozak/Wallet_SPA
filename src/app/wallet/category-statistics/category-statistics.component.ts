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
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  largestExpense: number;
  currentMonthLargestExpense: number;
  spentThisMonth: number;
  spentAll: number;

  chosenCategory: number;
  chosenCategoryName: string;

  compareBarExpenses: CategoryComparison;
  mostSpentUser: TopUsersStat = null;
  //here sum is count
  mostUsedUser: TopUsersStat = null;
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];

  expenses: ExpenseForTable[] = [];
  showData = true;

  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    console.log('log cat stat');
    
    this.route.params.subscribe(params => {
      this.walletService.getCurrentWallet();
      this.chosenCategory = +params['id'] || 0;
      if (this.walletService.currentCategories.length === 0) {
        this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
          console.log('init sub');
        });
      } else {
        this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
        console.log('init sim');

      }
      this.expService.getCategoryStatistics(this.chosenCategory).subscribe(data => {
        if (data['categoryExpenses'].length === 0) {
          this.isLoading = false;
          this.showData = false;
        }
        else {
          this.largestExpense = data['largestExpense'];
          this.currentMonthLargestExpense = data['currentMonthLargestExpense'];
          this.mostSpentUser = data['mostSpentUser'];
          this.mostUsedUser = data['mostUsedUser'];
          this.compareBarExpenses = data['barCompareExpensesWithLastMonth'];
          this.spentThisMonth = data['spentThisMonth'];
          this.spentAll = data['spentAll'];
          this.topFiveUsers = data['topFiveUsers'];
          this.lastSixMonths = data['lastSixMonths'];
          this.expenses = data['categoryExpenses'];
          this.showData = true;
          this.isLoading = false;
        }
      });
    });

  }

}

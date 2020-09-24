import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { ActivatedRoute } from '@angular/router';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.css']
})
export class CategoryStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private route: ActivatedRoute,
    private walletService: WalletService) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }

  showComparisonData = false;

  // largestExpense: number;
  // currentMonthLargestExpense: number;
  // spentThisMonth: number;
  // spentAll: number;

  chosenCategory: number;
  chosenCategoryName: string;

  currentMonthData: number;
  lastMonthData: number;
  //mostSpentUser: TopUsersStat = null;
  //here sum is count
  mostUsedUser: TopUsersStat = null;
  topFiveUsers: TopUsersStat[];
  lastSixMonths: LastMonthStat[];

  expenses = new MatTableDataSource<ExpenseForTable>();
  columnsForExpenses: string[] = ['expenseTitle', 'userName', 'moneySpent', 'expenseDescription', 'creationDate'];

  showData = true;

  isLoading: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.walletService.getCurrentWallet().subscribe();
      this.chosenCategory = +params['id'] || 0;
      if (this.walletService.currentCategories.length === 0) {
        this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
        });
      } else {
        this.chosenCategoryName = this.walletService.currentCategories.find(x => x.id === this.chosenCategory).title;
      }
      this.isLoading = true;
      this.expService.getCategoryStatistics(this.chosenCategory, new Date(Date.now()).toUTCString()).subscribe(data => {
        if (data['categoryExpenses'].length === 0) {
          this.showData = false;
        }
        else {
          this.expenses.data = data['categoryExpenses'];
          setTimeout(() => this.expenses.paginator = this.paginator);
          // this.largestExpense = data['largestExpense'];
          // this.currentMonthLargestExpense = data['currentMonthLargestExpense'];
          // this.mostSpentUser = data['mostSpentUser'];
          this.mostUsedUser = data['mostUsedUser'];
          this.currentMonthData = data['barCompareExpensesWithLastMonth']['currentMonthData'];
          this.lastMonthData= data['barCompareExpensesWithLastMonth']['lastMonthData'];

          if (this.currentMonthData > 0 && this.lastMonthData > 0){
            console.log('Comparison check', this.currentMonthData, this.lastMonthData);
            
            this.showComparisonData = true;
          }
          this.topFiveUsers = data['topFiveUsers'];
          this.lastSixMonths = data['lastSixMonths'];

          this.showData = true;
        }
        this.isLoading = false;
      });
    });

  }

}

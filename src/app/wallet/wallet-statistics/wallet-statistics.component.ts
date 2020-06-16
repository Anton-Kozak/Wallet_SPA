import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseList } from 'src/app/_model/expense-list';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { User } from 'src/app/_model/user';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';

@Component({
  selector: 'app-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.css', '../../css/spinner.css']
})
export class WalletStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private router: Router,
    private walletService: WalletService) { }

  isLoading: boolean;

  avgDailyExpenses: number;
  mostSpentCategory: string;
  mostUsedCategory: string;

  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  barExpenses: ExpenseList;
  lastSixMonths: LastMonthStat[];
  topFiveUsers: TopUsersStat[];
  walletMembers: User[];
  amountOfMoneySpent: number;
  categories: CategoryData[] = [];
  ngOnInit(): void {
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;
    this.isLoading = true;
    this.expService.getWalletStatistics().subscribe(response => {
      console.log(response);
      this.avgDailyExpenses = response['averageDailyExpense'];
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
      if (response['hasExpenseData'] === true) {
        this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
        this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
        this.barExpenses = response['barExpenses'];
        this.lastSixMonths = response['lastSixMonths'];
        this.topFiveUsers = response['topFiveUsers'];
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];

      }
      this.walletMembers = response['walletUsers'];
      this.isLoading = false;
    });

  }

  getUserStatistics(id: string) {
    console.log(id);

    this.router.navigate(['/wallet/userStatistics', id]);
  }

}

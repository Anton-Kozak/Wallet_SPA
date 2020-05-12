import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseList } from 'src/app/_model/expense-list';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { TopUsersStat } from 'src/app/_model/top-users-stat';

@Component({
  selector: 'app-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.css']
})
export class WalletStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService) { }

  avgDailyExpenses: number;
  mostSpentCategory: string;
  mostUsedCategory: string;

  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  barExpenses: ExpenseList;
  lastSixMonths: LastMonthStat[];
  topFiveUsers: TopUsersStat[];
  walletMembers: string[];
  amountOfMoneySpent: number;
  ngOnInit(): void {
    this.expService.getWalletStatistics().subscribe(response => {

      this.avgDailyExpenses = response['averageDailyExpense'];
      this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
      this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
      this.barExpenses = response['barExpenses'];
      this.lastSixMonths = response['lastSixMonths'];
      this.topFiveUsers = response['topFiveUsers'];
      this.mostUsedCategory = response['mostUsedCategory'];
      this.mostSpentCategory = response['mostSpentCategory'];
      this.walletMembers = response['walletUsers'];
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
      // console.log('Average daily expenses');
      // console.log(this.avgDailyExpenses);
      //  console.log('Current month');
      //  console.log(this.currentMonthDataToCompare);
      //  console.log('Last month');
      //  console.log(this.lastMonthDataToCompare);
      // console.log('Bar expenses');
      // console.log(this.barExpenses);
      //console.log('Top 5 users');
      // console.log(this.topFiveUsers); 
      //console.log('Last six month');
      //console.log(this.lastSixMonths);

    });
  }

}

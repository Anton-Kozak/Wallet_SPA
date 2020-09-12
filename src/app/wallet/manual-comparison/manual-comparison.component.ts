import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryData } from 'src/app/_model/categoryData';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { ExpenseList } from 'src/app/_model/expense-list';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { ExpenseService } from 'src/app/_services/expense.service';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.css']
})
export class ManualComparisonComponent implements OnInit {
  categories: CategoryData[] = [];
  columnsForSecondExpenses: string[] = ['expenseTitle', 'userName', 'category', 'moneySpent', 'creationDate'];
  columnsForFirstExpenses: string[] = ['expenseTitle', 'userName', 'category', 'moneySpent', 'creationDate'];
  showData = false;
  //first month
  firstDate: FormControl;
  firstDay = new Date();
  firstMonthMostSpent: string = '';
  firstMonthMostUsed: string = '';
  firstMonthAverage: number;
  firstMonthTotal: number;
  firstLargestExpense: number;
  firstMonthPreviousExpensesBars: ExpenseList[];
  firstMonthTopFiveUsers: TopUsersStat[];
  firstMonthExpenses = new MatTableDataSource<ExpenseForTable>();
  // @ViewChild('firstPaginator') fp: MatPaginator;
  @ViewChild('firstPaginator') set firstMatPaginator(paginator: MatPaginator) {
    this.firstMonthExpenses.paginator = paginator;
  }

  @ViewChild('secondPaginator') set secondMatPaginator(paginator: MatPaginator) {
    this.secondMonthExpenses.paginator = paginator;
  }

  //second month
  secondDay = new Date();
  secondDate: FormControl;
  secondMonthMostSpent: string = '';
  secondMonthMostUsed: string = '';
  secondMonthAverage: number;
  secondMonthTotal: number;
  secondLargestExpense: number;
  secondMonthPreviousExpensesBars: ExpenseList[];
  secondMonthTopFiveUsers: TopUsersStat[];
  secondMonthExpenses = new MatTableDataSource<ExpenseForTable>();
  //@ViewChild('secondPaginator') sp: MatPaginator;
  constructor(private expenseService: ExpenseService, private walletService: WalletService) { }

  ngOnInit(): void {
    // this.firstMonthExpenses.paginator = this.fp;
    this.firstDate = new FormControl(this.firstDay.toDateString());
    this.secondDate = new FormControl(this.secondDay.toDateString());
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else {
      this.categories = this.walletService.currentCategories;
    }

  }

  orgValueChangeFirst(value: any) {
    this.firstDay = new Date(value);
    this.firstDate = new FormControl(this.firstDay.toDateString());
    console.log(value);
    console.log(new Date(value));
  }


  orgValueChangeSecond(value: any) {
    this.secondDay = new Date(value);
    this.secondDate = new FormControl(this.secondDay.toDateString());
    console.log(value);
    console.log(new Date(value));
  }

  selectDates() {
    this.expenseService.getSpecifiedMonthsData(this.firstDay.toDateString(), this.secondDay.toDateString()).subscribe(response => {
      console.log(response);
      
      this.firstMonthMostSpent = response['firstMonthMostSpent'];
      this.firstMonthMostUsed = response['firstMonthMostUsed'];
      this.firstLargestExpense = response['firstLargestExpense'];
      this.firstMonthAverage = response['firstMonthAverage'];
      this.firstMonthPreviousExpensesBars = response['firstMonthPreviousExpensesBars'];
      this.firstMonthTopFiveUsers = response['firstMonthTopFiveUsers'];
      this.firstMonthExpenses.data = response['firstMonthExpenses'];
      this.firstMonthTotal = response['firstMonthTotal'];

      this.secondMonthMostSpent = response['secondMonthMostSpent'];
      this.secondMonthMostUsed = response['secondMonthMostUsed'];
      this.secondLargestExpense = response['secondLargestExpense'];
      this.secondMonthAverage = response['secondMonthAverage'];
      this.secondMonthPreviousExpensesBars = response['secondMonthPreviousExpensesBars'];
      this.secondMonthTopFiveUsers = response['secondMonthTopFiveUsers'];
      this.secondMonthExpenses.data = response['secondMonthExpenses'];
      this.secondMonthTotal = response['secondMonthTotal'];
      this.showData = true;
    });
  }

}

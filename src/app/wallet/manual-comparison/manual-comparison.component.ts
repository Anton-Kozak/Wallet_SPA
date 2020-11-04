import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
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
  firstMonthTotal: number = 0;
  firstLargestExpense: number;
  firstMonthPreviousExpensesBars: ExpenseList[];
  firstMonthTopFiveUsers: TopUsersStat[];
  firstMonthExpenses = new MatTableDataSource<ExpenseForTable>();
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

  walletCurrency: string = 'USD';

  constructor(private expenseService: ExpenseService, private walletService: WalletService, private translateService: TranslateService, private titleService: Title) { }

  ngOnInit(): void {
    this.walletService.getCurrentWallet().subscribe(wallet => {
      this.walletCurrency = wallet['currency'];
    })
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    }
    else if (this.translateService.currentLang === 'ru')
      moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      }
      else if (this.translateService.currentLang === 'ru')
        moment.locale('ru');
      this.firstDate = new FormControl(this.firstDay.toDateString());
      this.secondDate = new FormControl(this.secondDay.toDateString());
    })

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
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Date Comparison');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Сравнение по дате');
    }
  }

  orgValueChangeFirst(value: any) {
    this.firstDay = new Date(value);
    this.firstDate = new FormControl(this.firstDay.toDateString());
  }


  orgValueChangeSecond(value: any) {
    this.secondDay = new Date(value);
    this.secondDate = new FormControl(this.secondDay.toDateString());
  }

  selectDates() {
    this.firstMonthPreviousExpensesBars = null;
    this.secondMonthPreviousExpensesBars = null;
    this.firstMonthTopFiveUsers = null;
    this.secondMonthTopFiveUsers = null;
    this.expenseService.getSpecifiedMonthsData(this.firstDay.toDateString(), this.secondDay.toDateString()).subscribe(response => {
      if (response['firstMonthTotal'] > 0) {
        this.firstMonthMostSpent = response['firstMonthMostSpent'];
        this.firstMonthMostUsed = response['firstMonthMostUsed'];
        this.firstLargestExpense = response['firstLargestExpense'];
        this.firstMonthAverage = response['firstMonthAverage'];
        this.firstMonthPreviousExpensesBars = response['firstMonthPreviousExpensesBars'];
        this.firstMonthTopFiveUsers = response['firstMonthTopFiveUsers'];
        this.firstMonthExpenses.data = response['firstMonthExpenses'];
        this.firstMonthTotal = response['firstMonthTotal'];
      }
      else {
        this.firstMonthTotal = 0;
      }
      if (response['secondMonthTotal'] > 0) {
        this.secondMonthMostSpent = response['secondMonthMostSpent'];
        this.secondMonthMostUsed = response['secondMonthMostUsed'];
        this.secondLargestExpense = response['secondLargestExpense'];
        this.secondMonthAverage = response['secondMonthAverage'];
        this.secondMonthPreviousExpensesBars = response['secondMonthPreviousExpensesBars'];
        this.secondMonthTopFiveUsers = response['secondMonthTopFiveUsers'];
        this.secondMonthExpenses.data = response['secondMonthExpenses'];
        this.secondMonthTotal = response['secondMonthTotal'];
      }
      else {
        this.secondMonthTotal = 0;
      }
      this.showData = true;
    });
  }

  getFormat(date) {
    return moment(date).format('ll');
  }

}

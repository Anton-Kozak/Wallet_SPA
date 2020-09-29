import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpensesWithCategories } from 'src/app/_model/expensesWithCategories';
import { TopUsersStat } from 'src/app/_model/top-users-stat';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { ExpenseList } from 'src/app/_model/expense-list';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-previous-expenses',
  templateUrl: './show-previous-expenses.component.html',
  styleUrls: ['./show-previous-expenses.component.css']
})
export class ShowPreviousExpensesComponent implements OnInit {

  constructor(private expenseService: ExpenseService, private walletService: WalletService, private translateService: TranslateService, private titleService: Title) { }

  first: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  second: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  third: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fourth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  fifth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  sixth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  seventh: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  eigth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  nineth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  tenth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  isLoading: boolean;
  topFiveUsers: TopUsersStat[];
  barExpenses: ExpenseList[];
  categories: CategoryData[] = [];
  monthNumber = 1;
  monthName: string = '';
  year: string;
  date: Date;
  ngOnInit(): void {
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
    })

    this.date = new Date(Date.now());
    this.date.setMonth(this.date.getMonth() - 1);
    this.year = this.date.getFullYear().toLocaleString().replace(',', '');
    console.log('Init month', this.date);

    this.monthName = this.date.toLocaleString('default', { month: 'long' });
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else {
      this.categories = this.walletService.currentCategories;
    }
    this.getData(this.date);
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Previous Expenses');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Прошлые Траты');
    }
  }


  getData(date: Date) {
    this.expenseService.getPreviousExpenses(date.toUTCString()).subscribe((expenses: ExpensesWithCategories[]) => {
      this.isLoading = true;
      // console.log(expenses);
      this.barExpenses = expenses['previousExpensesBars'];
      //console.log(this.barExpenses);

      this.topFiveUsers = expenses['topFiveUsers'];
      if (expenses['previousMonthExpenses'][0]['expenses'].length > 0) {
        this.first.expenses = expenses['previousMonthExpenses'][0]['expenses'];
        this.first.categoryId = expenses['previousMonthExpenses'][0]['categoryId'];
        this.first.categoryName = expenses['previousMonthExpenses'][0]['categoryName'];
      }
      if (expenses['previousMonthExpenses'][1]['expenses'].length > 0) {
        this.second.expenses = expenses['previousMonthExpenses'][1]['expenses'];
        this.second.categoryId = expenses['previousMonthExpenses'][1]['categoryId'];
        this.second.categoryName = expenses['previousMonthExpenses'][1]['categoryName'];
      }
      if (expenses['previousMonthExpenses'][2]['expenses'].length > 0) {
        this.third.expenses = expenses['previousMonthExpenses'][2]['expenses'];
        this.third.categoryId = expenses['previousMonthExpenses'][2]['categoryId'];
        this.third.categoryName = expenses['previousMonthExpenses'][2]['categoryName'];
      }
      if (expenses['previousMonthExpenses'][3]['expenses'].length > 0) {
        this.fourth.expenses = expenses['previousMonthExpenses'][3]['expenses'];
        this.fourth.categoryId = expenses['previousMonthExpenses'][3]['categoryId'];
        this.fourth.categoryName = expenses['previousMonthExpenses'][3]['categoryName'];
      }
      if (expenses['previousMonthExpenses'][4]['expenses'].length > 0) {
        this.fifth.expenses = expenses['previousMonthExpenses'][4]['expenses'];
        this.fifth.categoryId = expenses['previousMonthExpenses'][4]['categoryId'];
        this.fifth.categoryName = expenses['previousMonthExpenses'][4]['categoryName'];
      }
      if (expenses['previousMonthExpenses'].length > 5) {
        if (expenses['previousMonthExpenses'][5]['expenses'].length > 0) {
          this.sixth.expenses = expenses['previousMonthExpenses'][5]['expenses'];
          this.sixth.categoryId = expenses['previousMonthExpenses'][5]['categoryId'];
          this.sixth.categoryName = expenses['previousMonthExpenses'][5]['categoryName'];
        }
        if (expenses['previousMonthExpenses'].length > 6) {
          if (expenses['previousMonthExpenses'][6]['expenses'].length > 0) {
            this.seventh.expenses = expenses['previousMonthExpenses'][6]['expenses'];
            this.seventh.categoryId = expenses['previousMonthExpenses'][6]['categoryId'];
            this.seventh.categoryName = expenses['previousMonthExpenses'][6]['categoryName'];
          }
          if (expenses['previousMonthExpenses'].length > 7) {
            if (expenses['previousMonthExpenses'][7]['expenses'].length > 0) {
              this.eigth.expenses = expenses['previousMonthExpenses'][7]['expenses'];
              this.eigth.categoryId = expenses['previousMonthExpenses'][7]['categoryId'];
              this.eigth.categoryName = expenses['previousMonthExpenses'][7]['categoryName'];
            }
            if (expenses['previousMonthExpenses'].length > 8) {
              if (expenses['previousMonthExpenses'][8]['expenses'].length > 0) {
                this.nineth.expenses = expenses['previousMonthExpenses'][8]['expenses'];
                this.nineth.categoryId = expenses['previousMonthExpenses'][8]['categoryId'];
                this.nineth.categoryName = expenses['previousMonthExpenses'][8]['categoryName'];
              }
              if (expenses['previousMonthExpenses'].length > 9) {
                if (expenses['previousMonthExpenses'][9]['expenses'].length > 0) {
                  this.tenth.expenses = expenses['previousMonthExpenses'][9]['expenses'];
                  this.tenth.categoryId = expenses['previousMonthExpenses'][9]['categoryId'];
                  this.tenth.categoryName = expenses['previousMonthExpenses'][9]['categoryName'];
                }
              }
            }
          }
        }
      }
      this.isLoading = false;
      //console.log(this.isLoading);
    });
  }

  previousMonth() {
    this.date = new Date(Date.now());
    this.monthNumber++;
    this.date.setMonth(this.date.getMonth() - this.monthNumber);
    console.log(this.date);
    console.log(this.monthNumber);

    this.monthName = this.date.toLocaleString('default', { month: 'long' });
    this.year = this.date.getFullYear().toLocaleString();
    this.clearData();
    this.getData(this.date);
  }

  next() {
    if (this.monthNumber - 1 !== 0) {
      this.monthNumber--;
      this.date = new Date(Date.now());
      this.date.setMonth(this.date.getMonth() - this.monthNumber);

      this.monthName = this.date.toLocaleString('default', { month: 'long' });
      this.year = this.date.getFullYear().toLocaleString();
      console.log(this.year);

      this.clearData();
      this.getData(this.date);

    }
  }

  clearData() {
    this.first = { categoryName: '', expenses: [], categoryId: 0 };
    this.second = { categoryName: '', expenses: [], categoryId: 0 };
    this.third = { categoryName: '', expenses: [], categoryId: 0 };
    this.fourth = { categoryName: '', expenses: [], categoryId: 0 };
    this.fifth = { categoryName: '', expenses: [], categoryId: 0 };
    this.sixth = { categoryName: '', expenses: [], categoryId: 0 };
    this.seventh = { categoryName: '', expenses: [], categoryId: 0 };
    this.eigth = { categoryName: '', expenses: [], categoryId: 0 };
    this.nineth = { categoryName: '', expenses: [], categoryId: 0 };
    this.tenth = { categoryName: '', expenses: [], categoryId: 0 };
    this.topFiveUsers = null;
    this.barExpenses = null;
  }

  getFormat(date) {
    return moment(date).format('lll');
  }
}

import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { PreviousData } from 'src/app/_model/data_models/previousData';
import { MyThemeService } from 'src/app/_services/theme.service';
import { ExpensesWithCategories } from 'src/app/_model/expense_models/expensesWithCategories';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-show-previous-expenses',
  templateUrl: './show-previous-expenses.component.html',
  styleUrls: ['./show-previous-expenses.component.css']
})
export class ShowPreviousExpensesComponent implements OnInit {
  constructor(
    private expenseService: ExpenseService,
    private walletService: WalletService,
    private translateService: TranslateService,
    private titleService: Title,
    private themeService: MyThemeService,
    private alertify: AlertifyService
  ) {}
  data: PreviousData = null;
  colors: string[] = [];
  isLoading = true;
  categories: CategoryData[] = [];
  walletCurrency = 'USD';
  monthNumber = 1;
  monthName = '';
  year: string;
  date: Date;

  get isUsersDataLengthNotNil(): boolean {
    return !!this.data.topFiveUsers.length;
  }

  get isCategoriesLengthNotNil(): boolean {
    return !!this.categories.length;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.setLanguage();
    this.setTheme();
    this.setDate();
    this.getCategories();
    this.getCurrency();
    this.getData(this.date);
  }
  private getCurrency(): void {
    this.walletService.getCurrentWallet().subscribe(
      (wallet) => {
        this.walletCurrency = wallet['currency'];
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private getCategories(): void {
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe(
        (data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.categories = this.walletService.currentCategories;
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    } else {
      this.categories = this.walletService.currentCategories;
    }
  }

  checkTableData(expenseData: ExpensesWithCategories): boolean {
    return expenseData.categoryId != 0 && expenseData.expenses.length > 0;
  }

  private setDate(): void {
    this.date = new Date(Date.now());
    this.date.setMonth(this.date.getMonth() - 1);
    this.year = moment(this.date).format('YYYY');
    this.monthName = moment(this.date).format('MMMM');
  }

  private setLanguage(): void {
    if (this.translateService.currentLang === Language.English) {
      moment.locale(Language.English);
    } else if (this.translateService.currentLang === Language.Russian)
      moment.locale(Language.Russian);

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === Language.English) {
        moment.locale(Language.English);
      } else if (this.translateService.currentLang === Language.Russian)
        moment.locale(Language.Russian);
      this.monthName = moment(this.date).format('MMMM');
    });

    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Previous Expenses');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Прошлые Траты');
    }
  }

  getData(date: Date): void {
    this.expenseService.getPreviousExpenses(date.toUTCString()).subscribe(
      (expenses: PreviousData) => {
        this.isLoading = true;
        // this.barExpenses = expenses.previousExpensesBars;
        // this.topFiveUsers = expenses.topFiveUsers;
        if (expenses.topFiveUsers.length > 0) {
          this.data = expenses;
          console.log('data', this.data);

          //this.expensesWithCategories = expenses.previousMonthExpenses;
        }
        this.isLoading = false;
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private setTheme() {
    this.themeService.getCurrentColors().subscribe((colors) => {
      this.colors = colors;
    });
  }

  previousMonth(): void {
    this.isLoading = true;
    this.date = new Date(Date.now());
    this.monthNumber++;
    this.date.setMonth(this.date.getMonth() - this.monthNumber, 1);
    this.monthName = moment(this.date).format('MMMM');
    this.year = moment(this.date).format('YYYY');
    this.getData(this.date);
  }

  next(): void {
    if (this.monthNumber - 1 !== 0) {
      this.isLoading = true;
      this.monthNumber--;
      this.date = new Date(Date.now());
      this.date.setMonth(this.date.getMonth() - this.monthNumber, 1);
      this.monthName = moment(this.date).format('MMMM');
      this.year = moment(this.date).format('YYYY');
      this.getData(this.date);
    }
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

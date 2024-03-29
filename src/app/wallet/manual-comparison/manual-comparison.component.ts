import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';
import { SpecifiedMonthData } from 'src/app/_model/data_models/specifiedMonthsData';
import { ExpenseService } from 'src/app/_services/expense.service';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.css']
})
export class ManualComparisonComponent implements OnInit {
  categories: CategoryData[] = [];
  columnsForSecondExpenses: string[] = [
    'expenseTitle',
    'userName',
    'category',
    'moneySpent',
    'creationDate'
  ];
  columnsForFirstExpenses: string[] = [
    'expenseTitle',
    'userName',
    'category',
    'moneySpent',
    'creationDate'
  ];
  specifiedDataStatistics: SpecifiedMonthData;
  showData = false;

  firstDate: FormControl;
  firstDay = new Date();
  firstMonthExpenses = new MatTableDataSource<ExpenseForTable>();
  @ViewChild('firstPaginator') set firstMatPaginator(paginator: MatPaginator) {
    this.firstMonthExpenses.paginator = paginator;
  }
  @ViewChild('secondPaginator') set secondMatPaginator(
    paginator: MatPaginator
  ) {
    this.secondMonthExpenses.paginator = paginator;
  }

  secondDay = new Date();
  secondDate: FormControl;
  secondMonthExpenses = new MatTableDataSource<ExpenseForTable>();

  walletCurrency = 'USD';

  get isSpecifiedDataStatisticsFirstTotalNil(): boolean {
    return this.specifiedDataStatistics.firstMonthTotal === 0;
  }
  get isSpecifiedDataStatisticsSecondTotalNil(): boolean {
    return this.specifiedDataStatistics.secondMonthTotal === 0;
  }
  get isCategoriesLengthNotNil(): boolean {
    return !!this.categories.length;
  }

  constructor(
    private expenseService: ExpenseService,
    private walletService: WalletService,
    private translateService: TranslateService,
    private titleService: Title,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.setCurrency();
    this.setLanguage();
    this.setDate();
    this.setCategories();
  }
  private setCurrency() {
    this.walletService.getCurrentWallet().subscribe(
      (wallet) => {
        this.walletCurrency = wallet['currency'];
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }

  private setCategories() {
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

  private setDate() {
    this.firstDate = new FormControl(this.firstDay.toDateString());
    this.secondDate = new FormControl(this.secondDay.toDateString());
  }

  private setLanguage() {
    if (this.translateService.currentLang === Language.English) {
      moment.locale(Language.English);
    } else if (this.translateService.currentLang === Language.Russian)
      moment.locale(Language.Russian);

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === Language.English) {
        moment.locale(Language.English);
      } else if (this.translateService.currentLang === Language.Russian)
        moment.locale(Language.Russian);
      this.setDate();
    });
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Date Comparison');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Сравнение по дате');
    }
  }

  orgValueChangeFirst(value: string): void {
    this.firstDay = new Date(value);
    this.firstDate = new FormControl(this.firstDay.toDateString());
  }

  orgValueChangeSecond(value: string): void {
    this.secondDay = new Date(value);
    this.secondDate = new FormControl(this.secondDay.toDateString());
  }

  selectDates(): void {
    this.resetData();
    this.expenseService
      .getSpecifiedMonthsData(
        this.firstDay.toDateString(),
        this.secondDay.toDateString()
      )
      .subscribe(
        (response: SpecifiedMonthData) => {
          if (response.firstMonthTotal > 0 && response.firstMonthTotal > 0) {
            this.specifiedDataStatistics = response;
            this.firstMonthExpenses.data = response.firstMonthExpenses;
            this.secondMonthExpenses.data = response.secondMonthExpenses;
          } else {
            this.specifiedDataStatistics.firstMonthTotal = 0;
            this.specifiedDataStatistics.secondMonthTotal = 0;
          }
          this.showData = true;
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  private resetData() {
    if (this.specifiedDataStatistics !== undefined) {
      this.specifiedDataStatistics.firstMonthPreviousExpensesBars = null;
      this.specifiedDataStatistics.secondMonthPreviousExpensesBars = null;
      this.specifiedDataStatistics.firstMonthTopFiveUsers = null;
      this.specifiedDataStatistics.secondMonthTopFiveUsers = null;
    }
  }

  getFormat(date: string): string {
    return moment(date).format('ll');
  }
}

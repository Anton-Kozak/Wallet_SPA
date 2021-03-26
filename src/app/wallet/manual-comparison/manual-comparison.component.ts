import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { ExpenseService } from 'src/app/_services/expense.service';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Language } from 'src/app/_helper/language';
import { SpecifiedMonthsData } from 'src/app/_model/data_models/specifiedMonthsData';

@Component({
  selector: 'app-manual-comparison',
  templateUrl: './manual-comparison.component.html',
  styleUrls: ['./manual-comparison.component.css']
})
export class ManualComparisonComponent implements OnInit {
  categories: CategoryData[] = [];
  specifiedDataStatistics: SpecifiedMonthsData;
  showData = false;

  firstDate: FormControl;
  firstDay = new Date();

  secondDay = new Date();
  secondDate: FormControl;

  walletCurrency = 'USD';

  get isSpecifiedDataStatisticsFirstTotalNil(): boolean {
    return this.specifiedDataStatistics.firstMonth.total === 0;
  }
  get isSpecifiedDataStatisticsSecondTotalNil(): boolean {
    return this.specifiedDataStatistics.secondMonth.total === 0;
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
        this.walletCurrency = wallet.currency;
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
        (response: SpecifiedMonthsData) => {
          if (!!response.firstMonth.total && !!response.secondMonth.total) {
            this.specifiedDataStatistics = response;
          } else {
            this.specifiedDataStatistics.firstMonth.total = 0;
            this.specifiedDataStatistics.firstMonth.total = 0;
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
      this.specifiedDataStatistics.firstMonth.previousExpensesBars = null;
      this.specifiedDataStatistics.secondMonth.previousExpensesBars = null;
      this.specifiedDataStatistics.firstMonth.topFiveUsers = null;
      this.specifiedDataStatistics.secondMonth.topFiveUsers = null;
    }
  }

  getFormattedDate(date: FormControl): string {
    return this.getFormat(date.value);
  }

  getFormat(date: string): string {
    return moment(date).format('ll');
  }
}

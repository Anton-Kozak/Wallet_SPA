import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DetailedWalletStatisticsDTO } from 'src/app/_model/data_models/detailedWalletStatisticsDTO';
import { ExpenseList } from 'src/app/_model/expense_models/expense-list';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.css', '../../css/spinner.css']
})
export class WalletStatisticsComponent implements OnInit {
  constructor(
    private expService: ExpenseService,
    private router: Router,
    private walletService: WalletService,
    private translateService: TranslateService,
    private titleService: Title,
    private alertify: AlertifyService
  ) {}

  isLoading: boolean;
  showComparisonData = false;
  statisticalData: DetailedWalletStatisticsDTO;
  categories: CategoryData[] = [];

  get isCategoriesLengthNotNil(): boolean {
    return !!this.categories.length;
  }

  get isMonthCompareDataNotNil(): boolean {
    return (
      !!this.statisticalData.barCompareExpensesWithLastMonth.currentMonthData &&
      !!this.statisticalData.barCompareExpensesWithLastMonth.lastMonthData
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.setLanguage();
    this.getAllCategories();
    this.getWalletStatistics();
  }
  private getWalletStatistics() {
    this.expService
      .getWalletStatistics(new Date(Date.now()).toUTCString())
      .subscribe(
        (response: DetailedWalletStatisticsDTO) => {
          this.statisticalData = response;
          if (this.checkIfHasPreviousData()) this.showComparisonData = true;
          this.isLoading = false;
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
  }

  private checkIfHasPreviousData() {
    return (
      this.statisticalData.barCompareExpensesWithLastMonth.currentMonthData.find(
        (el: ExpenseList) => {
          return el.categoryExpenses > 0;
        }
      ) &&
      this.statisticalData.barCompareExpensesWithLastMonth.lastMonthData.find(
        (el: ExpenseList) => {
          return el.categoryExpenses > 0;
        }
      )
    );
  }

  private setLanguage() {
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translateService.currentLang === 'ru') {
      moment.locale('ru');
    }
    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translateService.currentLang === 'ru')
        moment.locale('ru');
    });
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  private getAllCategories() {
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

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Wallet Statistics');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Статистика Кошелька');
    }
  }

  getUserStatistics(id: string): void {
    this.router.navigate(['/wallet/userStatistics', id]);
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

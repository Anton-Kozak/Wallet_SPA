import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DetailedCategoryStatisticsDTO } from 'src/app/_model/detailedCategoryStatisticsDTO';

@Component({
  selector: 'app-category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.css']
})
export class CategoryStatisticsComponent implements OnInit {
  constructor(
    private expService: ExpenseService,
    private route: ActivatedRoute,
    private walletService: WalletService,
    private translateService: TranslateService,
    private titleService: Title
  ) {}

  showComparisonData = false;
  chosenCategory: number;
  chosenCategoryName: string;

  detailedCategoryStatistics: DetailedCategoryStatisticsDTO;
  walletCurrency = 'USD';

  expenses = new MatTableDataSource<ExpenseForTable>();
  columnsForExpenses: string[] = [
    'expenseTitle',
    'userName',
    'moneySpent',
    'expenseDescription',
    'creationDate'
  ];

  showData = true;

  isLoading: boolean;
  @ViewChild('paginator') paginator: MatPaginator;
  ngOnInit(): void {
    this.getCurrencyData();
    this.getLanguageData();
    this.getData();
    this.setLanguage();
  }
  private getData() {
    this.route.params.subscribe((params) => {
      this.walletService.getCurrentWallet().subscribe();
      this.getCategoryData(params);
      this.isLoading = true;
      this.expService
        .getCategoryStatistics(
          this.chosenCategory,
          new Date(Date.now()).toUTCString()
        )
        .subscribe((data: DetailedCategoryStatisticsDTO) => {
          console.log('data', data);
          if (data.spentAll <= 0) {
            this.showData = false;
          } else {
            this.expenses.data = data.categoryExpenses;
            setTimeout(() => (this.expenses.paginator = this.paginator));
            this.detailedCategoryStatistics = data;
            this.showData = true;
          }
          this.isLoading = false;
        });
    });
  }

  private getCurrencyData() {
    this.walletService.getCurrentWallet().subscribe((wallet) => {
      this.walletCurrency = wallet['currency'];
    });
  }

  private getLanguageData() {
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translateService.currentLang === 'ru') moment.locale('ru');
    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translateService.currentLang === 'ru')
        moment.locale('ru');
    });
  }

  private setLanguage() {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  private getCategoryData(params) {
    this.chosenCategory = +params['id'] || 0;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService
        .getWalletsCategories()
        .subscribe((data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.chosenCategoryName = this.walletService.currentCategories.find(
            (x) => x.id === this.chosenCategory
          ).title;
        });
    } else {
      this.chosenCategoryName = this.walletService.currentCategories.find(
        (x) => x.id === this.chosenCategory
      ).title;
    }
  }

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Category Statistics');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Статистика Категории');
    }
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

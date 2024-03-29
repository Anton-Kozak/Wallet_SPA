import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';
import { WalletService } from 'src/app/_services/wallet.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DetailedCategoryStatisticsDTO } from 'src/app/_model/data_models/detailedCategoryStatisticsDTO';
import { MyThemeService } from 'src/app/_services/theme.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ColumnHeaders } from 'src/app/_helper/columns-headers';
import { Language } from 'src/app/_helper/language';

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
    private titleService: Title,
    private themeService: MyThemeService
  ) {}

  showComparisonData = false;
  chosenCategory: number;
  chosenCategoryName: string;

  detailedCategoryStatistics: DetailedCategoryStatisticsDTO;
  walletCurrency = 'USD';

  expenses = new MatTableDataSource<ExpenseForTable>();
  columnsForExpenses: string[] = [
    ColumnHeaders.Title,
    ColumnHeaders.UserName,
    ColumnHeaders.MoneySpent,
    ColumnHeaders.Description,
    ColumnHeaders.Date
  ];

  showData = true;
  currentTheme: string;
  isLoading: boolean;

  get isExpenseLengthNotNil(): boolean {
    return !!this.expenses.data.length;
  }
  get isExpenseLengthForPaginationExceed(): boolean {
    return this.expenses.data.length > 10;
  }

  @ViewChild('paginator') paginator: MatPaginator;
  ngOnInit(): void {
    this.setTheme();
    this.getCurrencyData();
    this.getLanguageData();
    this.getData();
    this.walletService.getCurrentWallet().subscribe();
    this.setLanguage();
  }

  private getData() {
    this.fetchCategoryData();
    this.getCategoryName();
  }

  private fetchCategoryData() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'] || 0;
        }),
        switchMap((category: number) => {
          return this.getCategoryStatistics(category);
        })
      )
      .subscribe();
  }
  private getCategoryName() {
    this.route.queryParams
      .pipe(
        tap((params) => {
          this.chosenCategoryName = params['category'];
        })
      )
      .subscribe();
  }

  private getCategoryStatistics(category: number) {
    this.isLoading = true;
    return this.expService
      .getCategoryStatistics(category, new Date(Date.now()).toUTCString())
      .pipe(
        map((data: DetailedCategoryStatisticsDTO) => {
          if (data.spentAll <= 0) {
            this.showData = false;
          } else {
            this.expenses.data = data.categoryExpenses;
            setTimeout(() => (this.expenses.paginator = this.paginator));
            this.detailedCategoryStatistics = data;
            this.showData = true;
          }
          this.isLoading = false;
        })
      );
  }

  private setTheme() {
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  private getCurrencyData() {
    this.walletService.getCurrentWallet().subscribe((wallet) => {
      this.walletCurrency = wallet['currency'];
    });
  }

  private getLanguageData() {
    if (this.translateService.currentLang === Language.English) {
      moment.locale(Language.English);
    } else if (this.translateService.currentLang === Language.Russian)
      moment.locale(Language.Russian);
    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === Language.English) {
        moment.locale(Language.English);
      } else if (this.translateService.currentLang === Language.Russian)
        moment.locale(Language.Russian);
    });
  }

  private setLanguage() {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Category Statistics');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Статистика Категории');
    }
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

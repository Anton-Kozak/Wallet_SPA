import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';
import { WalletForPage } from 'src/app/_model/wallet-for-page';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/_model/notification';
import { NotificationService } from 'src/app/_services/notification.service';
import { ExpensesWithCategories } from 'src/app/_model/expense_models/expensesWithCategories';
import { ActivatedRoute } from '@angular/router';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MyThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-show-wallet-table',
  templateUrl: './show-wallet-table.component.html',
  styleUrls: ['./show-wallet-table.component.css', '../../css/spinner.css']
})
export class ShowWalletTableComponent implements OnInit {
  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
    public dialog: MatDialog,
    private noteService: NotificationService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private titleService: Title,
    private themeService: MyThemeService
  ) {}

  colors: string[] = [];

  dailyExpenses: ExpenseForTable[] = [];
  dayForDailyExpenses = new Date();
  currentSelectedDate: FormControl;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moment: any = moment;
  walletTitle: string;
  walletLimit: number;
  walletCurrency: string;
  walletExpenses: number;
  type: string;
  private id;
  // expensesToShow: number;
  notifications: Notification[] = [];
  categories: CategoryData[] = [];
  isLoading: boolean;

  expensesWithCategories: ExpensesWithCategories[] = [];

  ngOnInit(): void {
    this.setLanguage();
    this.setTheme();
    this.getWalletData();
    this.expenseService
      .getExpenseSubjectsAsObservable()
      .subscribe((exp: ExpensesWithCategories[]) => {
        this.expensesWithCategories = exp;
      });
    this.expenseService.expensesSubject.subscribe((expData) => {
      this.walletExpenses = expData;
      this.checkLimit();
    });
    this.route.data.subscribe((data) => {
      this.categories = data['categories'];
    });

    this.noteService
      .getNotifications()
      .subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
      });
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }
  private getWalletData() {
    this.id = this.authService.getToken().nameid;
    this.isLoading = true;
    this.expenseService
      .getWalletData(this.id)
      .subscribe((walletData: WalletForPage) => {
        this.setWalletData(walletData);
        this.checkLimit();
        this.expenseService.showAllExpenses();
        this.setDailyExpenses();
        this.isLoading = false;
      });
  }

  private setDailyExpenses() {
    this.currentSelectedDate = new FormControl(
      moment(this.dayForDailyExpenses).format('LL')
    );
    this.expenseService
      .showDailyExpenses(this.dayForDailyExpenses.toUTCString())
      .subscribe((expenses: ExpenseForTable[]) => {
        this.dailyExpenses = expenses;
      });
  }

  private setWalletData(walletData: WalletForPage) {
    this.walletTitle = walletData.title;
    this.walletCurrency = walletData.currency;
    this.walletLimit = walletData.monthlyLimit;
  }

  private setTheme() {
    this.themeService.getCurrentColors().subscribe((colors) => {
      this.colors = colors;
      console.log('colors', colors);
    });
  }

  private setLanguage() {
    if (this.translateService.currentLang === 'en') {
      this.moment.locale('en');
    } else if (this.translateService.currentLang === 'ru')
      this.moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        this.moment.locale('en');
      } else if (this.translateService.currentLang === 'ru')
        this.moment.locale('ru');
      this.currentSelectedDate = new FormControl(
        this.moment(this.dayForDailyExpenses).format('LL')
      );
    });
  }

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Your Wallet');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Ваш Кошелёк');
    }
  }

  checkLimit(): void {
    if (this.walletLimit != 0) {
      if (this.walletExpenses < 0.25 * this.walletLimit) {
        this.type = 'success';
      } else if (this.walletExpenses < 0.5 * this.walletLimit) {
        this.type = 'info';
      } else if (this.walletExpenses < 0.75 * this.walletLimit) {
        this.type = 'warning';
      } else if (this.walletExpenses < 0.9 * this.walletLimit) {
        this.type = 'danger';
      } else if (this.walletExpenses >= this.walletLimit) {
        this.type = 'danger';
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateExpenseComponent);
    dialogRef.afterClosed().subscribe((newExpense) => {
      if (newExpense !== null) {
        if (
          this.moment(this.dayForDailyExpenses).format('ll') ===
          this.moment(new Date()).format('ll')
        )
          this.updateDailyExpenses();
      }
    });
  }

  showNotifications(): void {
    this.noteService.deleteNotifications().subscribe();
  }

  changeDay(direction: number): void {
    if (direction === 0)
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() - 1);
    else
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() + 1);

    this.updateDailyExpenses();
  }

  orgValueChange(value: string): void {
    this.dayForDailyExpenses = new Date(value);
    this.updateDailyExpenses();
  }

  getFormat(date: string): string {
    return moment(date).format('lll');
  }

  updateDailyExpenses(): void {
    this.expenseService
      .showDailyExpenses(this.dayForDailyExpenses.toUTCString())
      .subscribe((expenses: ExpenseForTable[]) => {
        this.currentSelectedDate.patchValue(
          this.moment(this.dayForDailyExpenses).format('ll')
        );
        this.dailyExpenses = expenses;
      });
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';
import { WalletForPage } from 'src/app/_model/wallet-for-page';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/_model/notification';
import { NotificationService } from 'src/app/_services/notification.service';
import { ExpensesWithCategories } from 'src/app/_model/expensesWithCategories';
import { ActivatedRoute } from '@angular/router';
import { CategoryData } from 'src/app/_model/categoryData';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
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


  constructor(private expenseService: ExpenseService,
    private authService: AuthService,
    public dialog: MatDialog,
    private noteService: NotificationService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private titleService: Title,
    private themeService: MyThemeService) { }

  colors: string[] = []; //['#F4B41C', '#F4A719', '#F39916', '#F38C13', '#CB7510', '#C0650C', '#B65509', '#AC4606', '#A13603', '#972600'];

  //old approach with 10 subjects
  // first: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // second: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // third: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // fourth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // fifth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // sixth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // seventh: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // eigth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // nineth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };
  // tenth: ExpensesWithCategories = { categoryName: '', expenses: [], categoryId: 0 };

  dailyExpenses: ExpenseForTable[] = [];
  dayForDailyExpenses = new Date();
  currentSelectedDate: FormControl;
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
    if (this.translateService.currentLang === 'en') {
      this.moment.locale('en');
    }
    else if (this.translateService.currentLang === 'ru')
      this.moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        this.moment.locale('en');
      }
      else if (this.translateService.currentLang === 'ru')
        this.moment.locale('ru');
      this.currentSelectedDate = new FormControl(this.moment(this.dayForDailyExpenses).format('LL'));
    });

    this.themeService.getCurrentColors().subscribe(colors => {
      this.colors = colors;
      console.log('colors', colors);
    });


    this.id = this.authService.getToken().nameid;
    this.isLoading = true;
    this.expenseService.getWalletData(this.id).subscribe((walletData: WalletForPage) => {
      this.walletTitle = walletData['title'];
      this.walletCurrency = walletData['currency'];
      this.expenseService.expensesSubject.subscribe(expData => {
        this.walletExpenses = expData;
        // this.expensesToShow = expData;
        this.checkLimit();
      });

      this.expenseService.getExpenseSubjectsAsObservable().subscribe(exp => {
        this.expensesWithCategories = exp;
        console.log('This is new!: ', exp);
      })

      this.walletLimit = walletData['monthlyLimit'];
      this.checkLimit();
      this.expenseService.showAllExpenses();
      {
        /*
        this.expenseService.firstSubject.subscribe(exp => {
          if (exp != null) {
            this.first.expenses = exp;
            this.first.categoryName = this.expenseService.firstExpenses.categoryName;
            this.first.categoryId = this.expenseService.firstExpenses.categoryId;
          }
        });
  
        this.expenseService.secondSubject.subscribe(exp => {
          if (exp != null) {
            this.second.expenses = exp;
            this.second.categoryName = this.expenseService.secondExpenses.categoryName;
            this.second.categoryId = this.expenseService.secondExpenses.categoryId;
          }
        });
        this.expenseService.thirdSubject.subscribe(exp => {
          if (exp != null) {
            this.third.expenses = exp;
            this.third.categoryName = this.expenseService.thirdExpenses.categoryName;
            this.third.categoryId = this.expenseService.thirdExpenses.categoryId;
          }
        });
        this.expenseService.fourthSubject.subscribe(exp => {
          if (exp != null) {
            this.fourth.expenses = exp;
            this.fourth.categoryName = this.expenseService.fourthExpenses.categoryName;
            this.fourth.categoryId = this.expenseService.fourthExpenses.categoryId;
          }
        });
        this.expenseService.fifthSubject.subscribe(exp => {
          if (exp != null) {
            this.fifth.expenses = exp;
            this.fifth.categoryName = this.expenseService.fifthExpenses.categoryName;
            this.fifth.categoryId = this.expenseService.fifthExpenses.categoryId;
          }
        });
  
        this.expenseService.sixthSubject.subscribe(exp => {
          if (exp != null) {
            this.sixth.expenses = exp;
            this.sixth.categoryName = this.expenseService.sixthExpenses.categoryName;
            this.sixth.categoryId = this.expenseService.sixthExpenses.categoryId;
          }
        });
  
        this.expenseService.seventhSubject.subscribe(exp => {
          if (exp != null) {
            this.seventh.expenses = exp;
            this.seventh.categoryName = this.expenseService.seventhExpenses.categoryName;
            this.seventh.categoryId = this.expenseService.seventhExpenses.categoryId;
          }
        });
  
        this.expenseService.eightthSubject.subscribe(exp => {
          if (exp != null) {
            this.eigth.expenses = exp;
            this.eigth.categoryName = this.expenseService.eightthExpenses.categoryName;
            this.eigth.categoryId = this.expenseService.eightthExpenses.categoryId;
          }
        });
  
        this.expenseService.ninethSubject.subscribe(exp => {
          if (exp != null) {
            this.nineth.expenses = exp;
            this.nineth.categoryName = this.expenseService.ninethExpenses.categoryName;
            this.nineth.categoryId = this.expenseService.ninethExpenses.categoryId;
          }
        });
  
        this.expenseService.tenthSubject.subscribe(exp => {
          if (exp != null) {
            this.tenth.expenses = exp;
            this.tenth.categoryName = this.expenseService.tenthExpenses.categoryName;
            this.tenth.categoryId = this.expenseService.tenthExpenses.categoryId;
          }
        });
        */
      }
      this.currentSelectedDate = new FormControl(moment(this.dayForDailyExpenses).format('LL'));
      this.expenseService.showDailyExpenses(this.dayForDailyExpenses.toUTCString()).subscribe((expenses: ExpenseForTable[]) => {
        this.dailyExpenses = expenses;
      })
      this.isLoading = false;
    });
    this.route.data.subscribe(data => {
      this.categories = data['categories'];
    })


    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    })
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Your Wallet');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Ваш Кошелёк');
    }
  }


  checkLimit() {
    if (this.walletLimit != 0) {
      if (this.walletExpenses < 0.25 * this.walletLimit) {
        this.type = 'success';
      } else if (this.walletExpenses < 0.5 * this.walletLimit) {
        this.type = 'info';
      } else if (this.walletExpenses < 0.75 * this.walletLimit) {
        this.type = 'warning';
      } else if (this.walletExpenses < 0.90 * this.walletLimit) {
        this.type = 'danger';
      }
      else if (this.walletExpenses >= this.walletLimit) {
        this.type = 'danger';
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateExpenseComponent);
    dialogRef.afterClosed().subscribe(newExpense => {
      if (newExpense !== null) {
        if (this.moment(this.dayForDailyExpenses).format('ll') === this.moment(new Date()).format('ll'))
          this.updateDailyExpenses();
      }
    });
  }

  showNotifications() {
    this.notifications.forEach(element => {
    });
    this.noteService.deleteNotifications().subscribe(() => {
    })
  }


  changeDay(direction: number) {
    if (direction === 0)
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() - 1);
    else
      this.dayForDailyExpenses.setDate(this.dayForDailyExpenses.getDate() + 1);

    this.updateDailyExpenses();
  }

  orgValueChange(value: any) {
    this.dayForDailyExpenses = new Date(value);
    this.updateDailyExpenses();
  }

  getFormat(date) {
    return moment(date).format('lll');
  }


  updateDailyExpenses() {
    this.expenseService.showDailyExpenses(this.dayForDailyExpenses.toUTCString()).subscribe((expenses: ExpenseForTable[]) => {
      this.currentSelectedDate.patchValue(this.moment(this.dayForDailyExpenses).format('ll'));
      this.dailyExpenses = expenses;
    })

  }
}

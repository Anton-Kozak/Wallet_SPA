import { Component, OnInit, Output } from '@angular/core';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/_services/auth.service';
import { EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { DetailedUserStatisticsDTO } from 'src/app/_model/data_models/detailedUserStatisticsDTO';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css', '../../css/spinner.css']
})
export class UserStatisticsComponent implements OnInit {
  constructor(
    private expService: ExpenseService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  columnsForExpenses: string[] = [
    'expenseTitle',
    'category',
    'moneySpent',
    'expenseDescription',
    'creationDate',
    'actions'
  ];
  expenses = new MatTableDataSource<ExpenseForTable>();
  expensesToSend: ExpenseForTable[] = [];
  detailedUserStatistics: DetailedUserStatisticsDTO;
  categories: CategoryData[] = [];
  year: string;

  isLoading = true;
  isThisUser: boolean;
  date: Date;
  monthNumber = 0;
  monthName = '';
  walletCurrency = 'USD';
  private id;
  theme = false;
  @Output() themeChange = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.checkIfCurrentUser();
    this.setLanguage();
    this.setDate();
    this.setCurrency();
    this.getCategories();
    this.getData(this.date);
    this.setTitle(this.translateService.currentLang);
  }
  private checkIfCurrentUser() {
    this.isThisUser = false;
    const userId = this.authService.decodedToken.nameid;
    this.id = this.route.snapshot.params['id'];
    if (userId === this.id) this.isThisUser = true;
  }

  private getCategories() {
    if (this.walletService.currentCategories.length === 0) {
      this.walletService
        .getWalletsCategories()
        .subscribe((categories: CategoryData[]) => {
          this.walletService.currentCategories = categories;
          this.categories = this.walletService.currentCategories;
        });
    } else this.categories = this.walletService.currentCategories;
  }

  private setCurrency() {
    this.walletService.getCurrentWallet().subscribe((wallet) => {
      this.walletCurrency = wallet['currency'];
    });
  }

  private setDate() {
    this.date = new Date(Date.now());
    this.date.setMonth(this.date.getMonth());
    this.year = moment(this.date).format('YYYY');
    this.monthName = moment(this.date).format('MMMM');
  }

  private setLanguage() {
    if (this.translateService.currentLang === 'en') {
      moment.locale('en');
    } else if (this.translateService.currentLang === 'ru') moment.locale('ru');

    this.translateService.onLangChange.subscribe(() => {
      if (this.translateService.currentLang === 'en') {
        moment.locale('en');
      } else if (this.translateService.currentLang === 'ru') {
        moment.locale('ru');
      }
      this.monthName = moment(this.date).format('MMMM');
    });
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }

  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Your Expenses');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Ваши Траты');
    }
  }
  //todo: rxjs
  private getData(date: Date): void {
    this.expService
      .getUserStatistics(this.id, date.toUTCString())
      .subscribe((response: DetailedUserStatisticsDTO) => {
        this.isLoading = true;
        if (response.amountOfMoneySpent > 0)
          this.detailedUserStatistics = response;
        this.isLoading = false;
      });
    this.expService
      .getUserExpenses(this.id, date.toUTCString())
      .subscribe((expensesRecieved: ExpenseForTable[]) => {
        this.expenses.data = expensesRecieved;
        this.expensesToSend = expensesRecieved;
      });
  }

  expenseDelete(id: number, rowIndex: number): void {
    const deleteConfirmation = confirm(
      this.translateService.currentLang === 'en'
        ? 'Do you really want to delete this expense?'
        : 'Вы действительно хотите удалить этот расход?'
    );
    if (deleteConfirmation) {
      this.expService.onExpenseDelete(id).subscribe(
        (response: string) => {
          this.alertify.success(response);
          this.expenses.data.splice(rowIndex, 1);
          this.expenses.data = this.expenses.data;
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    }
  }

  openDialog(id: number, rowIndex: number): void {
    const exp = this.expenses.data.find((x) => x.id === id);
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '550px',
      data: exp
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
        this.expenses.data[rowIndex].expenseDescription =
          result['expenseDescription'];
        this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
        this.expenses.data[rowIndex].creationDate = result['creationDate'];
      }
    });
  }

  previousMonth(): void {
    this.isLoading = true;
    this.date = new Date(Date.now());
    this.monthNumber--;
    if (this.monthNumber > 0)
      this.date.setMonth(this.date.getMonth() - this.monthNumber);
    else this.date.setMonth(this.date.getMonth() + this.monthNumber);
    this.year = moment(this.date).format('YYYY');
    this.monthName = moment(this.date).format('MMMM');
    this.clearData();
    this.getData(this.date);
  }

  next(): void {
    if (this.monthNumber < 0) {
      this.isLoading = true;
      this.monthNumber++;
      this.date = new Date(Date.now());
      this.date.setMonth(this.date.getMonth() + this.monthNumber);
      this.monthName = moment(this.date).format('MMMM');
      this.year = moment(this.date).format('YYYY');
      this.clearData();
      this.getData(this.date);
    }
  }

  clearData(): void {
    this.expenses = new MatTableDataSource<ExpenseForTable>();
    this.detailedUserStatistics.averageDailyExpense = 0;
    this.detailedUserStatistics.amountOfMoneySpent = 0;
    this.detailedUserStatistics.barExpenses = [];
    this.detailedUserStatistics.mostSpentCategory = '';
    this.detailedUserStatistics.mostUsedCategory = '';
  }
  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

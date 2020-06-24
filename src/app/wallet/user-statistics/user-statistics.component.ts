import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ExpenseList } from 'src/app/_model/expense-list';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { WalletService } from 'src/app/_services/wallet.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css', '../../css/spinner.css']
})
export class UserStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  columnsForExpenses: string[] = ['expenseTitle', 'category', 'moneySpent', 'expenseDescription', 'creationDate', 'actions'];
  expenses = new MatTableDataSource<ExpenseForTable>();

  isLoading: boolean;
  spentAll: number;
  avgDailyExpenses: number = 0;
  amountOfMoneySpent: number = 0;
  barExpenses: ExpenseList;
  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  mostSpentCategory: string;
  mostUsedCategory: string;
  lastSixMonths: LastMonthStat[];
  categories: CategoryData[] = [];
  isThisUser: boolean;
  private id;
  ngOnInit(): void {
    this.isThisUser = false;
    let userId = this.authService.decodedToken.nameid;
    this.id = this.route.snapshot.params['id'];
    if (userId === this.id)
      this.isThisUser = true;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((categories: CategoryData[]) => {
        this.walletService.currentCategories = categories;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;


    this.isLoading = true;
    this.expService.getUserStatistics(this.id).subscribe(response => {
      this.expService.getUserExpenses(this.id).subscribe((expensesRecieved: ExpenseForTable[]) => {
        this.expenses.data = expensesRecieved;
      })
      if (response['amountOfMoneySpent'] != 0) {
        this.avgDailyExpenses = response['averageDailyExpense'];
        this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
        this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
        this.barExpenses = response['barExpenses'];
        this.lastSixMonths = response['lastSixMonths'];
        this.mostUsedCategory = response['mostUsedCategory'];
        this.mostSpentCategory = response['mostSpentCategory'];
        this.amountOfMoneySpent = response['amountOfMoneySpent'];
      }
      this.isLoading = false;
    })
  }

  expenseDelete(id: number, rowIndex: number) {
    this.expService.onExpenseDelete(id).subscribe((response: any) => {
      this.alertify.success(response);
      this.expenses.data.splice(rowIndex, 1);
      this.expenses.data = this.expenses.data;
    }, error => {
      this.alertify.error(error.error);
    });
  }

  openDialog(id: number, rowIndex: number): void {
    var exp = this.expenses.data.find(x => x.id === id);
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '550px',
      data: exp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
        this.expenses.data[rowIndex].expenseDescription = result['expenseDescription'];
        this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
        this.expenses.data[rowIndex].creationDate = result['creationDate'];
      }
    });
  }


}

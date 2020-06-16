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
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }



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
  expenses: ExpenseForTable[] = [];
  categories: CategoryData[] = [];
  private id;

  @ViewChild('table') private table: ElementRef;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;


    this.isLoading = true;
    this.expService.getUserStatistics(this.id).subscribe(response => {
      this.expService.getUserExpenses(this.id).subscribe((data: ExpenseForTable[]) => {
        this.expenses = data;
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
      var el: any = (document.getElementById(rowIndex.toString())) as HTMLTableElement;
      //var index = el.rowIndex;
      el.remove(rowIndex);
    }, error => {
      this.alertify.error(error.error);
    });
  }

  openDialog(id: number): void {
    var exp = this.expenses.find(x => x.id === id);
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '250px',
      data: exp
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


}

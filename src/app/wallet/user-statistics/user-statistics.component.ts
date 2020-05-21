import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ExpenseList } from 'src/app/_model/expense-list';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/_model/expense';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  constructor(private expService: ExpenseService, private route: ActivatedRoute, private alertify: AlertifyService, public dialog: MatDialog) { }

  spentAll: number;
  avgDailyExpenses: number;
  amountOfMoneySpent: number;
  barExpenses: ExpenseList;
  currentMonthDataToCompare: ExpenseList;
  lastMonthDataToCompare: ExpenseList;
  mostSpentCategory: string;
  mostUsedCategory: string;
  lastSixMonths: LastMonthStat[];
  expenses: ExpenseForTable[] = [];
  private id;

  @ViewChild('table') private table: ElementRef;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);


    this.expService.getUserStatistics(this.id).subscribe(response => {
      this.avgDailyExpenses = response['averageDailyExpense'];
      this.currentMonthDataToCompare = response['barCompareExpensesWithLastMonth']['currentMonthData'];
      this.lastMonthDataToCompare = response['barCompareExpensesWithLastMonth']['lastMonthData'];
      this.barExpenses = response['barExpenses'];
      this.lastSixMonths = response['lastSixMonths'];
      this.mostUsedCategory = response['mostUsedCategory'];
      this.mostSpentCategory = response['mostSpentCategory'];
      this.amountOfMoneySpent = response['amountOfMoneySpent'];
    })

    this.expService.getUserExpenses(this.id).subscribe((data: ExpenseForTable[]) => {
      this.expenses = data;
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

  expenseEdit(){

  }

  openDialog(id: number): void {
    var exp = this.expenses.find(x=> x.id === id);
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '250px',
      data: exp
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


}

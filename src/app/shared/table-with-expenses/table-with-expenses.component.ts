import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseForTable } from '../../_model/expense_models/expense-for-table';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseForAdminTable } from 'src/app/_model/expense_models/expense-for-admin-table';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-table-with-expenses',
  templateUrl: './table-with-expenses.component.html',
  styleUrls: ['./table-with-expenses.component.css']
})
export class TableWithExpensesComponent implements OnInit, OnChanges {
  @Input('tableHeaders') tableHeaders: string[] = [];
  @Input('tableData') tableData:
    | ExpenseForTable[]
    | ExpenseForAdminTable[] = [];
  @Input('isThisUser') isThisUser = false;
  @Input('isAdmin') isAdmin = false;
  @Input('walletCurrency') walletCurrency = 'USD';
  @Input('hasPaginator') hasPaginator = true;

  expenses = new MatTableDataSource<ExpenseForTable | ExpenseForAdminTable>();
  @ViewChild('expPaginator') expensePaginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private expService: ExpenseService,
    private alertify: AlertifyService,
    private translateService: TranslateService
  ) {}
  ngOnChanges(): void {
    this.setData();
  }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.expenses.data = this.tableData;
    if (this.hasPaginator)
      setTimeout(() => {
        this.expenses.paginator = this.expensePaginator;
      }, 1);
  }

  doesContainCategory(category: string): boolean {
    return this.tableHeaders.includes(category);
  }

  //for user stats
  openDialog(id: number, rowIndex: number): void {
    const exp = this.expenses.data.find((x) => x.id === id);
    const dialogRef = this.dialog.open(EditExpenseModalComponent, {
      width: '550px',
      data: { expenseToEdit: exp, isAdmin: this.isAdmin }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != null) {
          this.expenses.data[rowIndex].expenseTitle = result['expenseTitle'];
          this.expenses.data[rowIndex].expenseDescription =
            result['expenseDescription'];
          this.expenses.data[rowIndex].moneySpent = result['moneySpent'];
          this.expenses.data[rowIndex].creationDate = result['creationDate'];
        }
      },
      (error) => {
        this.alertify.error(error.error);
      }
    );
  }
  expenseDelete(id: number, rowIndex: number): void {
    const deleteConfirmation = confirm(
      this.translateService.currentLang === Language.English
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

  getFormat(date: string): string {
    return moment(date).format('lll');
  }
}

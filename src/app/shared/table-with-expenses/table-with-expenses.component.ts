import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EditExpenseModalComponent } from 'src/app/expenses/edit-expense-modal/edit-expense-modal.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ExpenseService } from 'src/app/_services/expense.service';
import { ExpenseForTable } from '../../_model/expense-for-table';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseForAdminTable } from 'src/app/_model/expense-for-admin-table';

@Component({
    selector: 'app-table-with-expenses',
    templateUrl: './table-with-expenses.component.html',
    styleUrls: ['./table-with-expenses.component.css']
})
export class TableWithExpensesComponent implements OnInit, OnChanges {

    @Input('tableHeaders') tableHeaders: string[] = [];
    @Input('tableData') tableData: ExpenseForTable[] | ExpenseForAdminTable[] = [];
    @Input('isThisUser') isThisUser: boolean = false;
    @Input('walletCurrency') walletCurrency: string = 'USD';
    @Input('hasPaginator') hasPaginator: boolean = true;


    expenses = new MatTableDataSource<ExpenseForTable | ExpenseForAdminTable>();
    @ViewChild('expPaginator') expensePaginator: MatPaginator;
    constructor(
        public dialog: MatDialog,
        private expService: ExpenseService,
        private alertify: AlertifyService,
        private translateService: TranslateService) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        this.setData();
    }

    ngOnInit(): void {
        this.setData();
    }


    setData() {
        this.expenses.data = this.tableData;
        if (this.hasPaginator)
            setTimeout(() => {
                this.expenses.paginator = this.expensePaginator;
            }, 1);
    }


    //for user stats
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
    expenseDelete(id: number, rowIndex: number) {
        let deleteConfirmation = confirm(this.translateService.currentLang === 'en' ? "Do you really want to delete this expense?" : "Вы действительно хотите удалить этот расход?");
        if (deleteConfirmation) {
            this.expService.onExpenseDelete(id).subscribe((response: any) => {
                this.alertify.success(response);
                this.expenses.data.splice(rowIndex, 1);
                this.expenses.data = this.expenses.data;
            }, error => {
                this.alertify.error(error.error);
            });
        }
    }


    getFormat(date) {
        return moment(date).format('lll');
    }

}

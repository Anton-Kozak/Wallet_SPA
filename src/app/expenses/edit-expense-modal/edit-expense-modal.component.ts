/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-expense-modal',
  templateUrl: './edit-expense-modal.component.html',
  styleUrls: ['./edit-expense-modal.component.css']
})
export class EditExpenseModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditExpenseModalComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expService: ExpenseService,
    private alertify: AlertifyService,
    private adminService: AdminService
  ) {}

  editExpense: FormGroup;
  isLoading = false;
  isAdminEdit = false;
  exp: ExpenseForTable;

  get isDisabled(): boolean {
    return (
      (this.editExpense.invalid || this.checkExpenseValidity()) &&
      this.isLoading
    );
  }

  ngOnInit(): void {
    this.exp = this.data.expenseToEdit;
    this.isAdminEdit = this.data.isAdmin;
    this.editExpense = new FormGroup({
      title: new FormControl(this.exp.expenseTitle, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
      money: new FormControl(this.exp.moneySpent, [Validators.required]),
      desc: new FormControl(this.exp.expenseDescription, [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      date: new FormControl(this.getFormat(this.exp.creationDate), [
        Validators.required
      ])
    });
  }

  onEdit() {
    this.isLoading = true;
    if (this.editExpense.valid) {
      const expToEdit: ExpenseForTable = this.getExpenseforTableToEdit();
      if (!this.checkExpenseValidity()) {
        if (this.isAdminEdit) {
          this.adminService.onExpenseEdit(expToEdit).subscribe(
            (editedExpense: ExpenseForTable) => {
              this.alertify.success('Вы успешно обновили расход!');
              this.isLoading = false;
              this.dialogRef.close(editedExpense);
            },
            (error) => {
              this.alertify.error(error);
              this.isLoading = false;
            }
          );
        } else {
          this.expService.onExpenseEdit(expToEdit).subscribe(
            (editedExpense: ExpenseForTable) => {
              this.alertify.success('Вы успешно обновили расход!');
              this.isLoading = false;
              this.dialogRef.close(editedExpense);
            },
            (error) => {
              this.alertify.error(error);
              this.isLoading = false;
            }
          );
        }
      }
    }
  }

  private getExpenseforTableToEdit(): ExpenseForTable {
    return {
      id: this.exp.id,
      creationDate: this.exp.creationDate,
      expenseTitle: this.editExpense.value['title'],
      expenseDescription: this.editExpense.value['desc'],
      moneySpent: this.editExpense.value['money'],
      userName: this.exp.userName
    };
  }
  private checkExpenseValidity(): boolean {
    const expenseToEdit = this.getExpenseforTableToEdit();
    return (
      this.exp.userName == expenseToEdit.userName &&
      this.exp.creationDate === expenseToEdit.creationDate &&
      this.exp.expenseTitle === expenseToEdit.expenseTitle &&
      this.exp.moneySpent === expenseToEdit.moneySpent &&
      this.exp.expenseDescription === expenseToEdit.expenseDescription
    );
  }

  getFormat(date: Date): string {
    return moment(date).format('lll');
  }

  back(): void {
    this.dialogRef.close(null);
  }
}

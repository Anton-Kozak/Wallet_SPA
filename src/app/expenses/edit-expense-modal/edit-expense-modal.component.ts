/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
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
  isAdminEdit = false;
  exp: ExpenseForTable;

  ngOnInit(): void {
    this.exp = this.data;
    if (this.data['isAdmin'] !== undefined) this.isAdminEdit = true;
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

  onEdit(): void {
    if (this.editExpense.valid) {
      const expToEdit: ExpenseForTable = {
        id: this.exp.id,
        creationDate: this.exp.creationDate,
        expenseTitle: this.editExpense.value['title'],
        expenseDescription: this.editExpense.value['desc'],
        moneySpent: this.editExpense.value['money'],
        userName: this.exp.userName
      };
      if (
        this.exp.userName == expToEdit.userName &&
        this.exp.creationDate === expToEdit.creationDate &&
        this.exp.expenseTitle === expToEdit.expenseTitle &&
        this.exp.moneySpent === expToEdit.moneySpent &&
        this.exp.expenseDescription === expToEdit.expenseDescription
      ) {
        this.alertify.warning('You have not made any changes!');
      } else {
        this.expService.onExpenseEdit(expToEdit).subscribe(
          (editedExpense: ExpenseForTable) => {
            this.alertify.success('Вы успешно обновили расход!');
            this.dialogRef.close(editedExpense);
          },
          (error) => {
            this.alertify.error(error);
          }
        );
      }
    }
  }

  getFormat(date: Date): string {
    return moment(date).format('lll');
  }

  onAdminEdit(): void {
    if (this.editExpense.valid) {
      const expToEdit: ExpenseForTable = {
        id: this.exp.id,
        creationDate: this.exp.creationDate,
        expenseTitle: this.editExpense.value['title'],
        expenseDescription: this.editExpense.value['desc'],
        moneySpent: this.editExpense.value['money'],
        userName: this.exp.userName
      };
      if (
        this.exp.userName == expToEdit.userName &&
        this.exp.creationDate === expToEdit.creationDate &&
        this.exp.expenseTitle === expToEdit.expenseTitle &&
        this.exp.moneySpent === expToEdit.moneySpent &&
        this.exp.expenseDescription === expToEdit.expenseDescription
      ) {
        this.alertify.warning('You have not made any changes!');
      } else {
        this.adminService.onExpenseEdit(expToEdit).subscribe(
          (editedExpense: ExpenseForTable) => {
            this.alertify.success('Вы успешно обновили расход!');
            this.dialogRef.close(editedExpense);
          },
          (error) => {
            this.alertify.error(error);
          }
        );
      }
    }
  }

  back(): void {
    this.dialogRef.close(null);
  }
}

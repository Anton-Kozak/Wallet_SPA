import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseForTable } from 'src/app/_model/expense-for-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-edit-expense-modal',
  templateUrl: './edit-expense-modal.component.html',
  styleUrls: ['./edit-expense-modal.component.css']
})
export class EditExpenseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expService: ExpenseService,
    private alertify: AlertifyService,
    private adminService: AdminService) { }

  editExpense: FormGroup;
  isAdminEdit = false;
  exp: ExpenseForTable;
  //TODO: сделать полноценный validation 

  ngOnInit(): void {

    this.exp = this.data;
    if (this.data['isAdmin'] !== undefined)
      this.isAdminEdit = true;
    console.log(this.isAdminEdit);


    this.editExpense = new FormGroup({
      'title': new FormControl(this.exp.expenseName, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'money': new FormControl(this.exp.moneySpent, [Validators.required]),
      'desc': new FormControl(this.exp.expenseDescription, [Validators.minLength(4), Validators.maxLength(20)]),
      'date': new FormControl(this.exp.creationDate, [Validators.required]),
    })
  }

  //TODO: убрать запрос на authservice и указывать username сразу в ExpenseForTable
  onEdit() {
    if (this.editExpense.valid) {
      var expToEdit: ExpenseForTable = {
        id: this.exp.id,
        creationDate: this.editExpense.value['date'],
        expenseName: this.editExpense.value['title'],
        expenseDescription: this.editExpense.value['desc'],
        moneySpent: this.editExpense.value['money'],
        userName: this.exp.userName//this.authService.getToken().unique_name,
      };
      if (this.exp.userName == expToEdit.userName && this.exp.creationDate === expToEdit.creationDate && this.exp.expenseName === expToEdit.expenseName && this.exp.moneySpent === expToEdit.moneySpent) {
        this.alertify.warning("You have not made any changes!")
      }
      else {
        this.expService.onExpenseEdit(expToEdit).subscribe((editedExpense: ExpenseForTable) => {
          this.dialogRef.close(editedExpense);
        });
      }
    }
  }

  onAdminEdit() {
    if (this.editExpense.valid) {
      var expToEdit: ExpenseForTable = {
        id: this.exp.id,
        creationDate: this.editExpense.value['date'],
        expenseName: this.editExpense.value['title'],
        expenseDescription: this.editExpense.value['desc'],
        moneySpent: this.editExpense.value['money'],
        userName: this.exp.userName
      };
      if (this.exp.userName == expToEdit.userName && this.exp.creationDate === expToEdit.creationDate && this.exp.expenseName === expToEdit.expenseName && this.exp.moneySpent === expToEdit.moneySpent) {
        this.alertify.warning("You have not made any changes!")
      }
      else {
        this.adminService.onExpenseEdit(expToEdit).subscribe((editedExpense: ExpenseForTable) => {
          this.dialogRef.close(editedExpense);
        });
      }
    }
  }

  back(){
    this.dialogRef.close(null);
  }

}


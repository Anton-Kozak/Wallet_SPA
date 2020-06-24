import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryData } from 'src/app/_model/categoryData';
import { WalletService } from 'src/app/_services/wallet.service';
import { Expense } from 'src/app/_model/expense';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  expense: Expense;
  newExpenseForm: FormGroup;
  categoryTitles: CategoryData[] = [];

  constructor(private expenseService: ExpenseService,
    private walletService: WalletService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<CreateExpenseComponent>) { }

  ngOnInit(): void {
    this.newExpenseForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      'desc': new FormControl('', [Validators.minLength(4), Validators.maxLength(20)]),
      'category': new FormControl('', [Validators.required]),
      'money': new FormControl('', Validators.required)
    })
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categoryTitles = this.walletService.currentCategories;
      });
    }
    else
      this.categoryTitles = this.walletService.currentCategories;
  }

  createExpense() {
    console.log('form submit!');
    console.log(this.newExpenseForm.value['category']);

    if (this.newExpenseForm.errors == null) {
      this.expense = {
        expenseCategoryId: this.newExpenseForm.value['category'],
        expenseTitle: this.newExpenseForm.value['title'],
        expenseDescription: this.newExpenseForm.value['desc'],
        moneySpent: this.newExpenseForm.value['money'],
        creationDate: new Date()
      }
      this.expenseService.createExpense(this.expense).subscribe((response: any) => {
        if (response['message'] === null) {
          this.alertify.success("You have successfully created an expense!");
          this.dialogRef.close();
        }
        else {
          this.alertify.warning(response['message']);
          this.dialogRef.close();
        }
      }, error => {
        this.alertify.error("You did not create an expense");
      });
    }
  }

  back() {
    this.dialogRef.close();
  }

}

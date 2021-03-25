import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/_services/expense.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { WalletService } from 'src/app/_services/wallet.service';
import { Expense } from 'src/app/_model/expense_models/expense';
import * as moment from 'moment';
import { ExpenseWithMessage } from 'src/app/_model/expense_models/expenseWithMessage';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  expense: Expense;
  newExpenseForm: FormGroup;
  categoryTitles: CategoryData[] = [];
  isLoading = false;
  addExpenseButtonClick$: Subject<void> = new Subject();

  get isDisabled(): boolean {
    return this.newExpenseForm.invalid || this.isLoading;
  }
  constructor(
    private expenseService: ExpenseService,
    private walletService: WalletService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<CreateExpenseComponent>
  ) {}

  ngOnInit(): void {
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe(
        (data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.categoryTitles = this.walletService.currentCategories;
          this.setForm();
        },
        (error) => {
          this.alertify.error(error.error);
        }
      );
    } else {
      this.categoryTitles = this.walletService.currentCategories;
      this.setForm();
    }
  }

  expenseCreation(): void {
    this.createExpense();
    this.expenseService.createExpense(this.expense).subscribe(
      (response: ExpenseWithMessage) => {
        this.handleMessageAfterExpenseCreation(response);
      },
      () => {
        this.alertify.error('You did not create an expense!');
        this.isLoading = false;
      }
    );
  }

  private handleMessageAfterExpenseCreation(response: ExpenseWithMessage) {
    if (response.message === null) {
      this.alertify.success('You have successfully created an expense!');
      this.isLoading = false;
      this.dialogRef.close(this.expense);
    } else {
      this.alertify.warning(response.message);
      this.isLoading = false;
      this.dialogRef.close();
    }
  }

  setForm(): void {
    this.newExpenseForm = new FormGroup({
      title: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25)
        ]
      }),
      desc: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.minLength(4), Validators.maxLength(50)]
      }),
      category: new FormControl(this.categoryTitles[0].id, [
        Validators.required
      ]),
      money: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
  }
  createExpense(): void {
    const date = moment(new Date()).format();
    if (
      this.newExpenseForm.errors == null &&
      this.isLoading === false &&
      this.newExpenseForm.valid
    ) {
      this.isLoading = true;
      this.expense = {
        expenseCategoryId: this.newExpenseForm.value['category'],
        expenseTitle: this.newExpenseForm.value['title'],
        expenseDescription: this.newExpenseForm.value['desc'],
        moneySpent: this.newExpenseForm.value['money'],
        creationDate: date
      };
    }
  }

  back(): void {
    this.dialogRef.close();
  }
}

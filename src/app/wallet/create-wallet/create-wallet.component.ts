import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {
  constructor(
    private walletService: WalletService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<CreateWalletComponent>,
    private translateService: TranslateService
  ) {}
  walletForm: FormGroup;
  wallet: Wallet;
  finalCategories: number[] = [];
  createLoading = false;

  isActive: { id: number; status: boolean }[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 33; i++) {
      this.isActive.push({ id: i, status: false });
    }

    this.walletForm = new FormGroup({
      //TODO: сделать кастомный валидатор
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      currency: new FormControl('USD', Validators.required),
      limit: new FormControl(0, [Validators.required, Validators.min(10)])
    });
  }

  toggleCategory(categoryId: number): void {
    if (this.finalCategories.find((n) => n === categoryId) === undefined) {
      if (this.finalCategories.length < 10) {
        this.finalCategories.push(categoryId);
        this.isActive.find((n) => n.id === categoryId).status = true;
      }
    } else {
      this.finalCategories.splice(
        this.finalCategories.findIndex((n) => n === categoryId),
        1
      );
      this.isActive.find((n) => n.id === categoryId).status = false;
    }
  }

  createWallet(): void {
    const res = confirm(
      this.translateService.currentLang === 'en'
        ? 'Are you sure you want to create a wallet with these categories?'
        : 'Вы уверенны в своем выборе?'
    );
    if (res) {
      this.wallet = {
        title: this.walletForm.value['title'],
        monthlyLimit: this.walletForm.value['limit'],
        walletCategories: null,
        currency: this.walletForm.value['currency'],
        monthlyExpenses: 0
      };
      if (this.finalCategories.length >= 5) {
        this.createCategories();
      } else {
        this.alertify.error('You need to choose 5 or more categories!');
      }
    }
  }

  private createCategories() {
    this.walletService.createNewWallet(this.wallet).subscribe(
      () => {
        this.walletService
          .addCategoriesToWallet(this.finalCategories)
          .subscribe(
            () => {
              this.alertify.success('You have successfully created a wallet');
              this.dialogRef.close(true);
            },
            (error) => {
              this.alertify.error(error.statusText);
            }
          );
      },
      (error) => {
        this.alertify.error(error.statusText);
      }
    );
  }

  back(): void {
    this.dialogRef.close(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/_services/wallet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})
export class EditWalletComponent implements OnInit {

  constructor(private walletService: WalletService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<EditWalletComponent>) { }

  editWalletForm: FormGroup;
  walletToEdit: Wallet;
  public currentWallet: Wallet;
  ngOnInit(): void {
    this.walletService.getCurrentWallet().subscribe((currentWallet: Wallet) => {
      this.currentWallet = currentWallet;
      this.editWalletForm = new FormGroup({
        'title': new FormControl(this.currentWallet.title, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
        'currency': new FormControl(this.currentWallet.currency, Validators.required),
        'limit': new FormControl(this.currentWallet.monthlyLimit, Validators.min(10))
      });
    });
  }
  //TODO: сделать подтверждение смены названия
  //подумать о том, как себя должен вести кошелёк когда происходит смена имени и лимита, и что должно происходить у других пользователей
  walletEdit() {
    this.walletToEdit = ({
      title: this.editWalletForm.value['title'],
      monthlyLimit: this.editWalletForm.value['limit'],
      walletCategories: this.currentWallet.walletCategories,
      currency: this.editWalletForm.value['currency']
    });

    this.walletService.editWallet(this.walletToEdit).subscribe(response => {
      this.alertify.success("You have successfully edited your wallet");
    }, error => {
      this.alertify.error(error.error);
    });
  }

  goBack() {
    this.dialogRef.close();
  }
}
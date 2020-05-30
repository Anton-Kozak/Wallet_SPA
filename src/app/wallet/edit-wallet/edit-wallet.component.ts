import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/_services/wallet.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})
export class EditWalletComponent implements OnInit {

  constructor(private walletService: WalletService, private alertify: AlertifyService, private router: Router, private authService: AuthService) { }

  editWalletForm: FormGroup;
  walletToEdit: Wallet;
  public currentWallet: Wallet;
  ngOnInit(): void {
    this.walletService.getCurrentWallet(this.authService.getToken().id).subscribe((wallet: Wallet)=>{
      this.currentWallet = wallet;
      this.editWalletForm = new FormGroup({
        'title': new FormControl(this.currentWallet.title, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
        'limit': new FormControl(this.currentWallet.monthlyLimit, Validators.min(10))
      })
    })
  }
  //TODO: сделать подтверждение смены названия
  //подумать о том, как себя должен вести кошелёк когда происходит смена имени и лимита, и что должно происходить у других пользователей
  walletEdit() {
    this.walletToEdit = ({
      title: this.editWalletForm.value['title'],
      monthlyLimit: this.editWalletForm.value['limit'],
    }); 

    this.walletService.editWallet(this.authService.getToken().id, this.walletToEdit).subscribe(response => {
      this.alertify.success("You have successfully edited your wallet");
    }, error => {
      this.alertify.error(error.error);
    });
  }

  goBack() {
    this.router.navigate(['/main']);
  }

}

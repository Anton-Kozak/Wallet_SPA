import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(private walletService: WalletService, private alertify: AlertifyService, private router: Router, private authService: AuthService) { }
  walletForm: FormGroup;
  wallet: Wallet;
  ngOnInit(): void {
    this.walletForm = new FormGroup({
      //TODO: сделать кастомный валидатор
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      'limit': new FormControl(0, [Validators.required, Validators.min(10)])
    })
  }


  createWallet() {
    this.wallet = ({
      title: this.walletForm.value['title'],
      monthlyLimit: this.walletForm.value['limit'],
    });

    this.walletService.createNewWallet(this.wallet).subscribe((user: any) => {
      this.alertify.success("You have successfully created a wallet");
      this.authService.logout();
      this.alertify.success("Please, log in to see your wallet");
      this.router.navigate(['/home']);
    }, error => {
      this.alertify.error(error.statusText);
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }



}

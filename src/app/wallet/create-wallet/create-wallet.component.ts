import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(private walletService: WalletService, private alertify: AlertifyService, private router: Router) { }
  walletForm: FormGroup;
  wallet: Wallet;
  ngOnInit(): void {
    this.walletForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)])
    })
  }


  createWallet() {
    this.wallet = ({
      title: this.walletForm.value['title'],
    });
    console.log(this.wallet);

    this.walletService.createNewWallet(this.wallet).subscribe((user: any) => {
      this.alertify.success("You have successfully created a wallet");
      localStorage.setItem("currentUser", JSON.stringify(user));
      //TODO: сделать РАБОЧИЙ переход после создания кошелька
      this.router.navigate(['/main']);
    }, error => {
      this.alertify.error(error.statusText);
    });
  }



}

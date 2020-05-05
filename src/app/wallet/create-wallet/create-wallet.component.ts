import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(private walletService: WalletService, private alertify: AlertifyService) { }
  walletForm: FormGroup;
  wallet: Wallet;
  ngOnInit(): void {
    this.walletForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)])
    })
  }


  createWallet(){
    this.wallet = ({
      title: this.walletForm.value['title'],
    });
    console.log(this.wallet);
    
    this.walletService.createNewWallet(this.wallet).subscribe((response: any)=>{
      this.alertify.success(response.statusText);
    },error=>{
      this.alertify.error(error.statusText);
    });
  }



}

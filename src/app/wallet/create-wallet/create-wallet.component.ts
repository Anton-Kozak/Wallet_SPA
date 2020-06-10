import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/_model/wallet';
import { WalletService } from 'src/app/_services/wallet.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent implements OnInit {

  constructor(private walletService: WalletService,
    private alertify: AlertifyService,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<CreateWalletComponent>,
  ) { }
  walletForm: FormGroup;
  wallet: Wallet;
  finalCategories: number[] = [
  ];

  isActive: { id: number, status: boolean }[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 33; i++) {
      this.isActive.push({ id: i, status: false });
    }
    console.log(this.isActive);

    this.walletForm = new FormGroup({
      //TODO: сделать кастомный валидатор
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      'limit': new FormControl(0, [Validators.required, Validators.min(10)])
    })
  }

  toggleCategory(categoryId: number) {

    if (this.finalCategories.find(n => n === categoryId) === undefined) {
      if (this.finalCategories.length < 10) {
        this.finalCategories.push(categoryId);
        this.isActive.find(n => n.id === categoryId).status = true;
      }
    }
    else {
      this.finalCategories.splice(this.finalCategories.findIndex(n => n === categoryId), 1);
      this.isActive.find(n => n.id === categoryId).status = false;
    }
  }

  findCategory(id: number) {
    return true;
  }


  createWallet() {
    this.wallet = ({
      title: this.walletForm.value['title'],
      monthlyLimit: this.walletForm.value['limit'],
      walletCategories: null,
    });
    if (this.finalCategories.length >= 5) {
      this.walletService.createNewWallet(this.wallet).subscribe(() => {
        this.walletService.addCategoriesToWallet(this.finalCategories).subscribe(() => {
          this.alertify.success("You have successfully created a wallet");
          this.alertify.success("Please, log in to see your wallet");
          this.router.navigate(['/main']);
        }, error => {
          this.alertify.error(error.statusText);
        });
      }, error => {
        this.alertify.error(error.statusText);
      });


    }
    else {
      this.alertify.error("You need to choose 5 or more categories!");
    }


  }

  back() {
    this.dialogRef.close();
  }


  // clearCategories() {
  //   if (this.dragHistory.length > 0) {
  //     switch (this.dragHistory[this.dragHistory.length - 1].from) {
  //       case 'food':
  //         this.food.push(this.finalCategories[this.finalCategories.length - 1])
  //         break;
  //       case 'ent':
  //         this.entertainment.push(this.finalCategories[this.finalCategories.length - 1])
  //         break;
  //       case 'clothes':
  //         this.clothes.push(this.finalCategories[this.finalCategories.length - 1])
  //         break;
  //       case 'advisable':
  //         this.advisable.push(this.finalCategories[this.finalCategories.length - 1])
  //         break;
  //     }
  //     this.finalCategories.pop();
  //     this.dragHistory.pop();
  //   }
  // }



  // drop(event: CdkDragDrop<string[]>) {
  //   //reorganize
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   }
  //   //add to array 
  //   else {

  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.container.data.length);
  //     this.dragHistory.push(
  //       { from: event.previousContainer.id }
  //     )
  //     console.log(this.dragHistory);
  //   }
  // }



}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import { WalletService } from '../_services/wallet.service';
import { CategoryData } from '../_model/categoryData';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private noteService: NotificationService, private walletService: WalletService) {
  }
  isAuthorized = false;
  categoriesToAdd: number[] = [];
  notifications;
  //hasWallet = false;
  //TODO: имя пользователя показывать при логине
  userName: string;
  categories: CategoryData[] = [];


  ngOnInit(): void {
    this.walletService.getCurrentWallet();
    // this.route.data.subscribe(data => {
    //   this.categories = data['categories'];
    //   console.log(this.categories);
    // })
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;


    // this.authService.isLoggedIn.subscribe(result => {
    //   this.isAuthorized = result;
    //   console.log("Is authorized: " + this.isAuthorized);
    //   if (this.isAuthorized) {
    //     console.log('Trying to get notifications');

    //     this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
    //       this.notifications = notifications;
    //       this.notifications.forEach(element => {
    //         console.log(element.message);
    //       });
    //     })
    //   }
    // });

  }

  hasWallet() {
    if (this.authService.getToken() !== null) {
      if (this.authService.getToken().hasWallet === "true")
        return true;
      return false;
    }
    return false;
  }

  // chooseCategories() {
  //   let categories = [];  
  //   for (let i = 0; i < this.finalCategories.length; i++) {
  //     categories.push(this.walletService.currentCategories.indexOf(this.finalCategories[i]) + 1);
  //   }
  //   console.log(categories);
  //   //TODO : сделать больше или равно 5
  //   if (categories.length > 0)
  //     this.walletService.addCategoriesToWallet(categories).subscribe();
  // }

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

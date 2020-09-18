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
  //TODO: имя пользователя показывать при логине
  userName: string;
  categories: CategoryData[] = [];


  ngOnInit(): void {
    this.walletService.getCurrentWallet();
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categories = this.walletService.currentCategories;
      });
    } else
      this.categories = this.walletService.currentCategories;
  }

  hasWallet() {
    if (this.authService.getToken() !== null) {
      if (this.authService.getToken().hasWallet === "true")
        return true;
      return false;
    }
    return false;
  }

  

}

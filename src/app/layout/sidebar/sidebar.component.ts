import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { WalletService } from 'src/app/_services/wallet.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private walletService: WalletService
  ) {}
  id: string;
  categoryTitles: CategoryData[] = [];
  @Input() toggle: boolean;
  @Output() createExpense = new EventEmitter();

  @ViewChild('sidenav') sidenav: MatSidenav;
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((data) => {
      if (data === false) this.walletService.currentCategories = [];
    });
    this.id = this.authService.getToken().nameid;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService
        .getWalletsCategories()
        .subscribe((data: CategoryData[]) => {
          this.walletService.currentCategories = data;
          this.categoryTitles = this.walletService.currentCategories;
          this.getIcons();
        });
    } else {
      this.categoryTitles = this.walletService.currentCategories;
      this.getIcons();
    }
  }
  close() {
    this.sidenav.close();
  }

  getIcons() {
    for (let i = 0; i < this.categoryTitles.length; i++) {
      switch (this.categoryTitles[i].title) {
        case 'Food':
          this.categoryTitles[i].icon = 'fa-utensils';
          break;
        case 'Sweets':
          this.categoryTitles[i].icon = 'fa-candy-cane';
          break;
        case 'Fruits':
          this.categoryTitles[i].icon = 'fa-apple-alt';
          break;
        case 'Vegetables':
          this.categoryTitles[i].icon = 'fa-carrot';
          break;
        case 'Meat':
          this.categoryTitles[i].icon = 'fa-drumstick-bite';
          break;
        case 'Alcohol':
          this.categoryTitles[i].icon = 'fa-wine-glass';
          break;
        case 'Fast food':
          this.categoryTitles[i].icon = 'fa-pizza-slice';
          break;
        case 'Housekeeping':
          this.categoryTitles[i].icon = 'fa-house-user';
          break;
        case 'Electricity':
          this.categoryTitles[i].icon = 'fa-plug';
          break;
        case 'Gas':
          this.categoryTitles[i].icon = 'fa-gas-pump';
          break;
        case 'Water':
          this.categoryTitles[i].icon = 'fa-shower';
          break;
        case 'Entertainment':
          this.categoryTitles[i].icon = 'fa-grin-tears';
          break;
        case 'Internet Shopping':
          this.categoryTitles[i].icon = 'fa-shopping-cart';
          break;
        case 'Restaurants':
          this.categoryTitles[i].icon = 'fa-wine-bottle';
          break;
        case 'Cinema':
          this.categoryTitles[i].icon = 'fa-film';
          break;
        case 'Theatre':
          this.categoryTitles[i].icon = 'fa-theater-masks';
          break;
        case 'Smoking':
          this.categoryTitles[i].icon = 'fa-smoking';
          break;
        case 'Medicine':
          this.categoryTitles[i].icon = 'fa-medkit';
          break;
        case 'Medicaments':
          this.categoryTitles[i].icon = 'fa-tablets';
          break;
        case 'Treatment':
          this.categoryTitles[i].icon = 'fa-stethoscope';
          break;
        case 'Beauty':
        case 'Beauty accessories':
        case 'Beauty products':
        case 'Beauty procedures':
          this.categoryTitles[i].icon = 'fa-mask';
          break;
        case 'Sport':
        case 'Sport events':
        case 'Sport gambling':
        case 'Sport inventory':
        case 'Sport activities':
          this.categoryTitles[i].icon = 'fa-futbol';
          break;
        case 'Transportation':
          this.categoryTitles[i].icon = 'fa-car';
          break;
        case 'Air transportation':
          this.categoryTitles[i].icon = 'fa-plane';
          break;
        case 'Land transportation':
          this.categoryTitles[i].icon = 'fa-bus';
          break;
        case 'Other':
          this.categoryTitles[i].icon = 'fa-random';
          break;
        default:
          this.categoryTitles[i].icon = 'fa-exclamation-circle';
      }
    }
  }

  onCreate() {
    this.createExpense.emit('test');
  }
}

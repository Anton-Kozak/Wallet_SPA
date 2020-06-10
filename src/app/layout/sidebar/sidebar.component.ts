import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/_services/auth.service';
import { CategoryData } from 'src/app/_model/categoryData';
import { WalletService } from 'src/app/_services/wallet.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, 
    private walletService: WalletService,
    private route: ActivatedRoute) { }
  id: string;
  categoryTitles: CategoryData[] = [];
  @Output() createExpense = new EventEmitter();

  @ViewChild('sidenav') sidenav: MatSidenav;
  ngOnInit(): void {
    this.id = this.authService.getToken().nameid;
    this.route.data.subscribe(data => {
      this.categoryTitles = data['categories'];
    })
    this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
      this.categoryTitles = data;
      console.log(this.categoryTitles);
      
    });
  }
  close() {
    this.sidenav.close();
  }

  onCreate() {
    this.createExpense.emit("test");
  }



}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../_helper/roles';
import { AuthService } from '../_services/auth.service';
import { WalletService } from '../_services/wallet.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {
  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    private router: Router
  ) {}

  vipStatus = '';

  get getStatus(): boolean {
    return this.vipStatus === Roles.Premium;
  }

  ngOnInit(): void {
    this.authService.roleMatch(Roles.Premium) === true
      ? (this.vipStatus = Roles.Premium)
      : (this.vipStatus = Roles.Standard);
  }

  onPremiumClick(): void {
    this.walletService.becomePremium().subscribe(
      () => {
        this.authService.logout();
        this.router.navigate(['/main/reg']);
      },
      (error) => {
        alert(error.error);
      }
    );
  }
}

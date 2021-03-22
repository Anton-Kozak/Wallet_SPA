import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.authService.roleMatch(['VIP']) === true
      ? (this.vipStatus = 'VIP')
      : 'Standard';
  }

  onPremiumClick(): void {
    this.walletService.becomePremium().subscribe(
      (result) => {
        console.log('subscribed', result);
        this.authService.logout();
        this.router.navigate(['/main/reg']);
      },
      (error) => {
        alert(error.error);
        console.error(error.error);
      }
    );
  }
}

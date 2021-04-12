import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Roles } from '../_helper/roles';
import { AuthService } from '../_services/auth.service';
import { WalletService } from '../_services/wallet.service';
import { Language } from 'src/app/_helper/language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {
  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
    private titleService: Title
  ) {}

  vipStatus = '';

  get getStatus(): boolean {
    return this.vipStatus === Roles.Premium;
  }

  ngOnInit(): void {
    this.authService.roleMatch(Roles.Premium) === true
      ? (this.vipStatus = Roles.Premium)
      : (this.vipStatus = Roles.Standard);
    this.setLanguage();
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

  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('VIP');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Премиум подписка');
    }
  }

  private setLanguage() {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }
}

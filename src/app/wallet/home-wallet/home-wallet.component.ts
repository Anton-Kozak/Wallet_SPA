import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home-wallet',
  templateUrl: './home-wallet.component.html',
  styleUrls: ['./home-wallet.component.css']
})
export class HomeWalletComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
    setTimeout(() => {
      if (this.authService.roleMatch(['Blocked']))
        alert("Your account has been blocked. Contact wallet's admin");
    }, 500);
  }
  setTitle(lang: string): void {
    if (lang === 'en') {
      this.titleService.setTitle('Welcome to XPense!');
    } else if (lang === 'ru') {
      this.titleService.setTitle('Добро Пожаловать!');
    }
  }
}

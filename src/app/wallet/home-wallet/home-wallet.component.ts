import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-wallet',
  templateUrl: './home-wallet.component.html',
  styleUrls: ['./home-wallet.component.css']
})
export class HomeWalletComponent implements OnInit {

  constructor(private translateService: TranslateService, private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(lang => {
      this.setTitle(lang['lang']);
    });

  }
  setTitle(lang: string) {
    if (lang === 'en') {
      this.titleService.setTitle('Welcome to XPense!');
    }
    else if (lang === 'ru') {
      this.titleService.setTitle('Добро Пожаловать!');
    }
  }

}

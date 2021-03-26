import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/_helper/language';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn = false;
  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((res) => {
      this.isSignedIn = res;
    });
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }
  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('Home Page');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('Домашняя Страница');
    }
  }
}

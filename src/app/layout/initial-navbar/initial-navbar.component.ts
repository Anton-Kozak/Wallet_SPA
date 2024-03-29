import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/_helper/language';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-initial-navbar',
  templateUrl: './initial-navbar.component.html',
  styleUrls: ['./initial-navbar.component.css']
})
export class InitialNavbarComponent implements OnInit {
  activeLang: string;
  isSignedIn: boolean;

  get isEnglishActiveLanguage(): boolean {
    return this.activeLang === Language.English;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs([Language.English, Language.Russian]);
    translate.setDefaultLang(Language.English);
    const LANGUAGE = localStorage.getItem('language');
    if (!!LANGUAGE) {
      this.translate.use(LANGUAGE);
      this.activeLang = localStorage.getItem(LANGUAGE);
    } else {
      this.activeLang = translate.getBrowserLang();
      translate.use(
        this.activeLang.match(/en|ru/) ? this.activeLang : Language.English
      );
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((res) => {
      this.isSignedIn = res;
    });
  }

  changeLang(lang: string): void {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
    this.activeLang = lang;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/main/reg']);
  }
}

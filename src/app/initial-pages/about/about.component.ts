import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.setTitle(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((lang) => {
      this.setTitle(lang['lang']);
    });
  }
  setTitle(lang: string): void {
    if (lang === Language.English) {
      this.titleService.setTitle('About Us');
    } else if (lang === Language.Russian) {
      this.titleService.setTitle('О Нас');
    }
  }
}

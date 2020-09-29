import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tips: { title: string, tip: string }[] = [];
  panelOpenState = false;
  constructor(private http: HttpClient, public translate: TranslateService, private titleService: Title) { }

  ngOnInit(): void {
    this.getTipsWithRightLanguage(this.translate.currentLang);  
    this.translate.onLangChange.subscribe(lang => {
      this.getTipsWithRightLanguage(lang['lang']);
    })
  }

  getTipsWithRightLanguage(lang) {
    if (lang === 'ru') {
      this.http.get('assets/tips_ru.json').subscribe(tips => {
        this.tips = [];
        for (const key in tips['Tips']) {
          this.tips.push({ title: key, tip: tips['Tips'][key] });
        }
        this.titleService.setTitle('Советы для бюджета');
      })
    }
    else if (lang === 'en') {
      this.http.get('assets/tips_en.json').subscribe(tips => {
        this.tips = [];
        for (const key in tips['Tips']) {
          this.tips.push({ title: key, tip: tips['Tips'][key] });
        }
        this.titleService.setTitle('Budget Tips');
      })
    }
  }

}

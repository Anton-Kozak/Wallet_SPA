import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tips: { title: string, tip: string }[] = [];
  panelOpenState = false;
  constructor(private http: HttpClient, public translate: TranslateService) { }

  ngOnInit(): void {
    this.getTipsWithRightLanguage(this.translate.currentLang);
    this.translate.onLangChange.subscribe(lang => {
      this.getTipsWithRightLanguage(lang);
    })
  }

  getTipsWithRightLanguage(lang) {
    if (lang['lang'] === 'ru') {
      this.http.get('assets/tips_ru.json').subscribe(tips => {
        this.tips = [];
        for (const key in tips['Tips']) {
          this.tips.push({ title: key, tip: tips['Tips'][key] });
        }
      })
    }
    else if (lang['lang'] === 'en') {
      this.tips = [];
      this.http.get('assets/tips_en.json').subscribe(tips => {
        for (const key in tips['Tips']) {
          this.tips.push({ title: key, tip: tips['Tips'][key] });
        }
      })
    }
  }

}

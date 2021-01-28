import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { BehaviorSubject, Subject } from 'rxjs';

export const blueTheme = {
  'content-background': '#424242',
  'sidebar-background': '#2b2b2b',
  'sidebar-header-item': '#ffb2042b',
  'sidebar-item': '#e4d8c9',
  'sidebar-item-selected': '#ffb204',
  'navbar-background': '#1f1f1f',
  'navbar-text': '#e4d8c9',
  'navbar-borders': '#ffb204',
  'navbar-icons': '#ffb204',
  'card-background': '#273442',
  'card-tip-text': 'white',
  'card-description-text': '#e4d8c9',
  'card-borders': '#627d9a',
  'card-footer-text': '#e4d8c9',
  'card-table-header': '#ffc400',
  'card-table-text': '#e4d8c9',
  'text-color': '#ffb204',
  'table-expense-header': '.65',
  'spinner-first': '#ffc107',
  'spinner-second': '#008855',
  'button-text': '#ffb204',
  'button-text-hover': 'black',
  'home-tips': "#1c2a38"
};

export const lightTheme = {
  'content-background': '#dee8f1',
  'sidebar-background': '#e3f2ff',
  'sidebar-header-item': '#bde0ff',
  'sidebar-item': '#66615B',
  'sidebar-item-selected': '#0084ff',
  'navbar-background': '#eef7ff',
  'navbar-text': 'black',
  'navbar-borders': '#a6bdff',
  'navbar-icons': '#0084ff',
  'card-background': 'white',
  'card-tip-text': 'black',
  'card-description-text': '#9A9A9A',
  'card-footer-text': '#66615B',
  'card-borders': '#007bff',
  'card-table-header': '#0084ff',
  'card-table-text': 'black',
  'text-color': 'black',
  'table-expense-header': '1',
  'spinner-first': '#00e1ff',
  'spinner-second': '#006eff',
  'button-text': '#0084ff',
  'button-text-hover': 'white',
  'home-tips': "#eef7ff",
};

export const darkTheme = {
  'content-background': '#424242',
  'sidebar-background': '#2b2b2b',
  'sidebar-header-item': '#ffb2042b',
  'sidebar-item': '#e4d8c9',
  'sidebar-item-selected': '#ffb204',
  'navbar-background': '#1f1f1f',
  'navbar-text': '#e4d8c9',
  'navbar-borders': '#ffb204',
  'navbar-icons': '#ffb204',
  'card-background': '#2c2c2c',
  'card-tip-text': 'white',
  'card-description-text': '#e4d8c9',
  'card-borders': '#ffb204',
  'card-footer-text': '#e4d8c9',
  'card-table-header': '#ffc400',
  'card-table-text': '#e4d8c9',
  'text-color': '#ffb204',
  'table-expense-header': '.65',
  'spinner-first': '#ffc107',
  'spinner-second': '#008855',
  'button-text': '#ffb204',
  'button-text-hover': 'black',
  'home-tips': "#1c2a38"
};

@Injectable({
  providedIn: 'root'
})
export class MyThemeService {

  private currentTheme = new BehaviorSubject<string>(localStorage.getItem('theme'));
  private currentColors = new BehaviorSubject<string[]>(null);


  getCurrentColors() {
    return this.currentColors.asObservable();
  }

  getCurrentTheme() {
    return this.currentTheme.asObservable();
  }


  checkTheme() {
    switch (localStorage.getItem('theme')) {
      case 'dark':
        this.toggleDark();
        break;
      case 'light':
        this.toggleLight();
        break;
      case 'blue':
        this.toggleBlue();
        break;
      default:
        this.toggleLight();
        break;
    }
  }

  constructor(private themeService: ThemeService) {
    this.checkTheme();
  }
  toggleDark() {
    this.setThemeDark();
    localStorage.setItem('theme', 'dark');
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: '#ffb204' }
      }
    };
    this.themeService.setColorschemesOptions(overrides);
  }


  toggleLight() {
    this.setThemeLight();
    localStorage.setItem('theme', 'light');
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: 'black' }
      },
    };
    this.themeService.setColorschemesOptions(overrides);
  }

  toggleBlue() {
    this.setThemeBlue();
    localStorage.setItem('theme', 'blue');
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: '#ffb204' }
      },
    };
    this.themeService.setColorschemesOptions(overrides);
  }

  setThemeBlue() {
    this.currentTheme.next('blue');
    this.setTheme(blueTheme);
    this.currentColors.next(['#F4B41C', '#F4A719', '#F39916', '#F38C13', '#CB7510', '#C0650C', '#B65509', '#AC4606', '#A13603', '#972600']);
  }

  setThemeLight() {
    this.setTheme(lightTheme);
    this.currentTheme.next('light');
    this.currentColors.next(['#cafcfa', '#cafcdf', '#dafcca', '#fcf0ca', '#fcd9ca', '#fccaca', '#fccaea', '#eccafc', '#d1cafc', '#cad8fc']);
  }

  setThemeDark() {
    this.setTheme(darkTheme);
    this.currentTheme.next('dark');
    this.currentColors.next(['#F4B41C', '#F4A719', '#F39916', '#F38C13', '#CB7510', '#C0650C', '#B65509', '#AC4606', '#A13603', '#972600']);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}

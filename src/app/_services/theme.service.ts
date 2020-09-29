import { Injectable } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ThemeService } from 'ng2-charts';

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
  'card-background': '#273442', //#62759e #273442  #83adc7
  'card-tip-text': 'white',
  'card-description-text': '#e4d8c9',
  'card-footer-text': '#e4d8c9',
  'card-table-header': '#ffc400',
  'card-table-text': '#e4d8c9',
  'text-color': '#ffb204',
  'table-expense-header': '.65',
  'spinner-first': '#ffc107',
  'spinner-second': '#008855',
  'button-text' : '#ffb204',
  'button-text-hover' : 'black',
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
  'card-table-header': '#0084ff',
  'card-table-text': 'black',
  'text-color': 'black',
  'table-expense-header': '1',
  'spinner-first': '#00e1ff',
  'spinner-second': '#006eff',
  'button-text' : '#0084ff',
  'button-text-hover' : 'white',
};

@Injectable({
  providedIn: 'root'
})
export class MyThemeService {

  currentTheme: string;


  checkTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      this.setTheme(darkTheme);
      this.currentTheme = 'dark';
    }
    else {
      this.setTheme(lightTheme);
      this.currentTheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }

  constructor(private themeService: ThemeService) {
    this.checkTheme();
  }
  toggleDark() {
    this.setTheme(darkTheme);
    localStorage.setItem('theme', 'dark');
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: '#ffb204' }
      },
    };
    this.themeService.setColorschemesOptions(overrides);
  }


  toggleLight() {
    this.setTheme(lightTheme);
    localStorage.setItem('theme', 'light');
    let overrides: ChartOptions;
    overrides = {
      legend: {
        labels: { fontColor: 'black' }
      },
    };
    this.themeService.setColorschemesOptions(overrides);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}

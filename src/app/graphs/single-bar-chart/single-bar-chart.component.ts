import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseList } from 'src/app/_model/expense-list';
import { CategoryData } from 'src/app/_model/categoryData';
import { MyColors } from 'src/app/_helper/chart-colors';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MyThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.css']
})
export class SingleBarChartComponent implements OnInit {

  @Input() barExpensesList: ExpenseList;
  @Input() categories: CategoryData[];
  colors: MyColors = new MyColors();
  labelColor = "black";
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#008855',
        },
      }],
      yAxes: [{
        ticks: {
          fontColor: '#008855',
        },
      }]
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#008855',
        fontSize: 13
      },
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];
  labels: { [key: string]: string }[] = [];

  constructor(private translate: TranslateService) {

  }
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  translateLabels() {
    if (this.translate.currentLang === 'en') {
      this.labels = this.translate.translations.en.ExpenseCategory;
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartData[i] = { label: this.labels[this.categories[i].title], data: [this.barExpensesList[i]['categoryExpenses']], backgroundColor: this.colors.colors[i].backgroundColor, borderColor: this.colors.colors[i].borderColor, hoverBackgroundColor: this.colors.colors[i].hoverBackgroundColor };

      }
    }
    else if (this.translate.currentLang === 'ru') {
      this.labels = this.translate.translations.ru.ExpenseCategory;
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartData[i] = { label: this.labels[this.categories[i].title], data: [this.barExpensesList[i]['categoryExpenses']], backgroundColor: this.colors.colors[i].backgroundColor, borderColor: this.colors.colors[i].borderColor, hoverBackgroundColor: this.colors.colors[i].hoverBackgroundColor };
      }
    }
  }
}

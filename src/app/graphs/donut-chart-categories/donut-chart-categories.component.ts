import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { ExpenseList } from 'src/app/_model/expense-list';
import { CategoryData } from 'src/app/_model/categoryData';
import { MyColors } from 'src/app/_helper/chart-colors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donut-chart-categories',
  templateUrl: './donut-chart-categories.component.html',
  styleUrls: ['./donut-chart-categories.component.css']
})
export class DonutChartCategoriesComponent implements OnInit {

  @Input() barExpensesList: ExpenseList[];
  @Input() categories: CategoryData[];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData = [];
  public doughnutChartType: ChartType = 'doughnut';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    legend: {
      position: 'top',
      labels: {
        fontColor: '#008855',
        fontSize: 13
      }
    },
  };
  colors: MyColors = new MyColors();
  labels: { [key: string]: string }[] = [];
  public donutChartColors = [
    {
      backgroundColor: [
        this.colors.colors[0].backgroundColor,
        this.colors.colors[1].backgroundColor,
        this.colors.colors[2].backgroundColor,
        this.colors.colors[3].backgroundColor,
        this.colors.colors[4].backgroundColor,
        this.colors.colors[5].backgroundColor,
        this.colors.colors[6].backgroundColor,
        this.colors.colors[7].backgroundColor,
        this.colors.colors[8].backgroundColor,
        this.colors.colors[9].backgroundColor,
      ],
    },
  ];
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  translateLabels() {
    if (this.translate.currentLang === 'en') {
      this.labels = this.translate.translations.en.ExpenseCategory;
      this.doughnutChartLabels = [];
      for (let i = 0; i < this.categories.length; i++) {
        this.doughnutChartLabels.push(this.labels[this.categories[i].title]);
        this.doughnutChartData[i] = this.barExpensesList[i]['categoryExpenses'];
      }
    }
    else if (this.translate.currentLang === 'ru') {
      this.labels = this.translate.translations.ru.ExpenseCategory;
      this.doughnutChartLabels = [];
      for (let i = 0; i < this.categories.length; i++) {
        this.doughnutChartLabels.push(this.labels[this.categories[i].title]);
        this.doughnutChartData[i] = this.barExpensesList[i]['categoryExpenses'];
      }
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ExpenseList } from 'src/app/_model/expense-list';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CategoryData } from 'src/app/_model/categoryData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bar-comparison',
  templateUrl: './bar-comparison.component.html',
  styleUrls: ['./bar-comparison.component.css']
})
export class BarComparisonComponent implements OnInit {
  @Input() currentMonthbarExpensesList: ExpenseList;
  @Input() lastMonthbarExpensesList: ExpenseList;
  @Input() categories: CategoryData[];
  date: Date;
  prevDate: Date;

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#F4B41C',
            fontSize: 14
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#F4B41C',
            fontSize: 14
          }
        }
      ]
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#F4B41C',
        fontSize: 13
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  labels: { [key: string]: string }[] = [];
  months: { [key: string]: string }[] = [];
  public barChartData: ChartDataSets[] = [];

  constructor(private translate: TranslateService) {
    this.barChartData = [
      {
        data: [],
        label: 'Last Month',
        backgroundColor: '#F4B41C',
        borderColor: '#fad378',
        hoverBackgroundColor: '#c28f17',
        hoverBorderColor: '#fad378'
      },
      {
        data: [],
        label: 'Current Month',
        backgroundColor: '#972600',
        borderColor: '#91513c',
        hoverBackgroundColor: '#91513c',
        hoverBorderColor: '#91513c'
      }
    ];
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.date = new Date(Date.now());
    this.prevDate = new Date(Date.now());
    this.date.setMonth(this.date.getMonth());
    this.prevDate.setMonth(this.date.getMonth() - 1);

    this.translateLabels();
  }

  translateLabels() {
    if (this.translate.currentLang === 'en') {
      this.labels = this.translate.translations.en.ExpenseCategory;
      this.months = this.translate.translations.en.Months;
      this.barChartLabels = [];
      this.barChartData[0].label = this.months[
        this.date.toLocaleString('default', { month: 'long' })
      ];
      this.barChartData[1].label = this.months[
        this.prevDate.toLocaleString('default', { month: 'long' })
      ];
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartLabels.push([this.categories[i].title]);
        this.barChartData[1].data[i] = this.currentMonthbarExpensesList[i][
          'categoryExpenses'
        ];
        this.barChartData[0].data[i] = this.lastMonthbarExpensesList[i][
          'categoryExpenses'
        ];
      }
    } else if (this.translate.currentLang === 'ru') {
      this.labels = this.translate.translations.ru.ExpenseCategory;
      this.months = this.translate.translations.ru.Months;
      this.barChartLabels = [];
      this.barChartData[0].label = this.months[
        this.date.toLocaleString('default', { month: 'long' })
      ];
      this.barChartData[1].label = this.months[
        this.prevDate.toLocaleString('default', { month: 'long' })
      ];
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartLabels.push([this.labels[this.categories[i].title]]);
        this.barChartData[1].data[i] = this.currentMonthbarExpensesList[i][
          'categoryExpenses'
        ];
        this.barChartData[0].data[i] = this.lastMonthbarExpensesList[i][
          'categoryExpenses'
        ];
      }
    }
  }
}

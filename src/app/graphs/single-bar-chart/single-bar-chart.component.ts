import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseList } from 'src/app/_model/expense_models/expense-list';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { MyColors } from 'src/app/_helper/chart-colors';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/_helper/language';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.css']
})
export class SingleBarChartComponent implements OnInit {
  @Input() barExpensesList: ExpenseList;
  @Input() categories: CategoryData[];
  colors: MyColors = new MyColors();
  labelColor = 'black';
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#008855'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#AC4606'
          }
        }
      ]
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#972600',
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
  public barChartLabels: Label[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];
  labels: { [key: string]: string }[] = [];

  get isLengthNotNil(): boolean {
    return !!this.categories.length;
  }

  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  translateLabels(): void {
    if (this.translate.currentLang === Language.English) {
      this.labels = this.translate.translations.en.ExpenseCategory;
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartData[i] = {
          label: this.labels[this.categories[i].title],
          data: [this.barExpensesList[i].categoryExpenses],
          backgroundColor: this.colors.colors[i].backgroundColor,
          borderColor: this.colors.colors[i].borderColor,
          hoverBackgroundColor: this.colors.colors[i].backgroundColor
        };
      }
    } else if (this.translate.currentLang === Language.Russian) {
      this.labels = this.translate.translations.ru.ExpenseCategory;
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartData[i] = {
          label: this.labels[this.categories[i].title],
          data: [this.barExpensesList[i].categoryExpenses],
          backgroundColor: this.colors.colors[i].backgroundColor,
          borderColor: this.colors.colors[i].borderColor,
          hoverBackgroundColor: this.colors.colors[i].backgroundColor
        };
      }
    }
  }
}

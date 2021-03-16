import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { LastMonthStat } from 'src/app/_model/lastMonthStat';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() lastSixMonths: LastMonthStat[];

  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Data' }];
  public lineChartLabels: Label[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          gridLines: {
            color: 'transparent'
          },
          ticks: {
            fontColor: '#AC4606'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#AC4606'
          },
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'transparent'
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'transparent'
          },
          ticks: {
            fontColor: 'transparent'
          }
        }
      ]
    },
    legend: {
      display: false
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'February',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#F4B41C',
      borderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  months: { [key: string]: string }[] = [];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.lastSixMonths = this.lastSixMonths.reverse();
    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  translateLabels(): void {
    if (this.translate.currentLang === 'en') {
      this.months = this.translate.translations.en.Months;
      for (let i = 0; i < this.lastSixMonths.length; i++) {
        this.lineChartData[0].data[i] = [
          this.lastSixMonths[i]['expenseSum']
        ][0];
        this.lineChartLabels[i] = this.months[this.lastSixMonths[i]['month']];
      }
    } else if (this.translate.currentLang === 'ru') {
      this.months = this.translate.translations.ru.Months;
      for (let i = 0; i < this.lastSixMonths.length; i++) {
        this.lineChartData[0].data[i] = [
          this.lastSixMonths[i]['expenseSum']
        ][0];
        this.lineChartLabels[i] = this.months[this.lastSixMonths[i]['month']];
      }
    }
  }
}

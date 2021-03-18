import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { TopUsersStat } from 'src/app/_model/user_models/top-users-stat';
import { MyColors } from 'src/app/_helper/chart-colors';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.css']
})
export class PieGraphComponent implements OnInit {
  @Input() topFiveUsers: TopUsersStat[];
  colors: MyColors = new MyColors();
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    legend: {
      position: 'top',
      labels: {
        fontColor: '#AC4606',
        fontSize: 13
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        this.colors.colors[0].backgroundColor,
        this.colors.colors[3].backgroundColor,
        this.colors.colors[5].backgroundColor,
        this.colors.colors[7].backgroundColor,
        this.colors.colors[9].backgroundColor
      ]
    }
  ];

  ngOnInit(): void {
    for (let i = 0; i < this.topFiveUsers.length; i++) {
      this.pieChartData[i] = this.topFiveUsers[i]['sum'];
      this.pieChartLabels[i] = this.topFiveUsers[i]['userName'];
    }
  }
}

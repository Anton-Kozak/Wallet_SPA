import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { TopUsersStat } from 'src/app/_model/top-users-stat';

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.css']
})
export class PieGraphComponent implements OnInit {

  @Input() topFiveUsers: TopUsersStat[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.2,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.7)', 'rgba(0,255,0,0.7)', 'rgba(255,0,255,0.7)', 'rgba(125,152,255,0.7)', 'rgba(238,235,67,0.7)', 'rgba(200,0,200,0.7)'],
    },
  ];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.topFiveUsers.length; i++) {
           this.pieChartData[i] = this.topFiveUsers[i]['sum'];
           this.pieChartLabels[i] = this.topFiveUsers[i]['userName'];
    }
  }
}

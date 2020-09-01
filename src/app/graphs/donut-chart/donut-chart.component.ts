import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  donutColors=[
    {
      backgroundColor: [
        '#aaf0d1',
        '#f0b4aa',
    ]
    }
  ];

  @Input() currentMonthbar: number;
  @Input() lastMonthbar: number;
  @Input() category: string;
  public doughnutChartLabels: Label[] = ['Current Month', 'Last Month'];
  public doughnutChartData = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.doughnutChartData.push(this.currentMonthbar);
    this.doughnutChartData.push(this.lastMonthbar);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  donutColors = [
    {
      backgroundColor: ['#F4B41C', '#972600']
    }
  ];

  @Input() currentMonthbar: number;
  @Input() lastMonthbar: number;
  @Input() category: string;

  public doughnutChartLabels: Label[] = ['Current Month', 'Last Month'];
  public doughnutChartData = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    legend: {
      display: true,
      labels: {
        fontSize: 13,
        fontStyle: 'bold'
      }
    }
  };
  ngOnInit(): void {
    this.doughnutChartData.push(this.currentMonthbar);
    this.doughnutChartData.push(this.lastMonthbar);
  }
}

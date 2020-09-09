import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-category-comparison',
  templateUrl: './bar-category-comparison.component.html',
  styleUrls: ['./bar-category-comparison.component.css']
})
export class BarCategoryComparisonComponent implements OnInit {

  @Input() currentMonthbar: number;
  @Input() lastMonthbar: number;
  @Input() category: string;
  colors=[
    {
      backgroundColor: [
        '#aaf0d1',
        '#f0b4aa',
        '#f0d6aa',
        '#beaaf0',
        '#aacaf0',
        '#e0aaf0',
        '#f0e8aa',
        '#c4f0a2',
        '#a2e7f0',
        '#f0a2c4',
    ]
    }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    legend: {
      display: true,
      labels: {
        fontColor: '#008855',
        fontSize: 14
      },
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Last Month' },
    { data: [], label: 'Current Month' },
  ];

  constructor() { }

  ngOnInit() {
    const last = this.lastMonthbar;
    this.barChartData[0].data = [this.lastMonthbar];
   
    const current = this.currentMonthbar;
    console.log(this.currentMonthbar);
    this.barChartData[1].data = [31];
    console.log(this.barChartData);
    this.barChartLabels[0] = this.category;
    console.log(this.currentMonthbar);
    

  }

}

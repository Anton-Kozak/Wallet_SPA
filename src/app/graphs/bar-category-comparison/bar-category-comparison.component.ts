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
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
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

    this.barChartData[0].data[0] = this.currentMonthbar;

    this.barChartData[1].data[0] = this.lastMonthbar;
    this.barChartLabels[0] = this.category;
    console.log(this.currentMonthbar);
    

  }

}

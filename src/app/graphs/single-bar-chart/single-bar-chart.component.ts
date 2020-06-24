import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseList } from 'src/app/_model/expense-list';
import { CategoryData } from 'src/app/_model/categoryData';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.css']
})
export class SingleBarChartComponent implements OnInit {

  @Input() barExpensesList: ExpenseList;
  @Input() categories: CategoryData[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.2,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Last Expenses'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
  ];

  constructor() {  }
  ngOnInit() {
      for (let i = 0; i < this.categories.length; i++) {
        this.barChartData.push({ data: [], label: '' });
        this.barChartData[i] = { label: this.categories[i].title, data: [this.barExpensesList[i]['categoryExpenses']] };
      }
  }


}

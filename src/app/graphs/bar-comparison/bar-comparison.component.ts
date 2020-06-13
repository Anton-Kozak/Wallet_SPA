import { Component, OnInit, Input } from '@angular/core';
import { ExpenseList } from 'src/app/_model/expense-list';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CategoryData } from 'src/app/_model/categoryData';

@Component({
  selector: 'app-bar-comparison',
  templateUrl: './bar-comparison.component.html',
  styleUrls: ['./bar-comparison.component.css']
})
export class BarComparisonComponent implements OnInit {

  @Input() currentMonthbarExpensesList: ExpenseList;
  @Input() lastMonthbarExpensesList: ExpenseList;
  @Input() categories: CategoryData[];
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
    
    for (let i = 0; i < this.categories.length; i++) {
      this.barChartLabels.push([this.categories[i].title]);
      this.barChartData[1].data[i] = this.currentMonthbarExpensesList[i]['categoryExpenses'];
      this.barChartData[0].data[i] = this.lastMonthbarExpensesList[i]['categoryExpenses'];
    }
    // this.barChartData[0].data[0] = [this.currentMonthbarExpensesList['houseExpenses']][0];
    // this.barChartData[0].data[1] = [this.currentMonthbarExpensesList['foodExpenses']][0];
    // this.barChartData[0].data[2] = [this.currentMonthbarExpensesList['clothesExpenses']][0];
    // this.barChartData[0].data[3] = [this.currentMonthbarExpensesList['entertainmentExpenses']][0];
    // this.barChartData[0].data[4] = [this.currentMonthbarExpensesList['otherExpenses']][0];

    // this.barChartData[1].data[0] = [this.lastMonthbarExpensesList['houseExpenses']][0];
    // this.barChartData[1].data[1] = [this.lastMonthbarExpensesList['foodExpenses']][0];
    // this.barChartData[1].data[2] = [this.lastMonthbarExpensesList['clothesExpenses']][0];
    // this.barChartData[1].data[3] = [this.lastMonthbarExpensesList['entertainmentExpenses']][0];
    // this.barChartData[1].data[4] = [this.lastMonthbarExpensesList['otherExpenses']][0];
    

  }

}

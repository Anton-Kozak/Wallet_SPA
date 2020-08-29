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
  //finalCategories: {data: number, title: string}[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.2,
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

  constructor() { }
  ngOnInit() {
    for (let i = 0; i < this.categories.length; i++) {
      this.barChartData.push({ data: [], label: '' });

      this.barChartData[i] = { label: this.categories[i].title, data: [this.barExpensesList[i]['categoryExpenses']] };
    }

    // for (let i = 0; i < this.categories.length; i++) {
    //   if (this.barExpensesList[i]['categoryExpenses'] !== 0)
    //     this.finalCategories.push({ data: this.barExpensesList[i]['categoryExpenses'], title: this.categories[i].title });
    // }
    // for (let i = 0; i < this.finalCategories.length; i++) {
    //   this.barChartData.push({ data: [], label: '' });
    //   this.barChartData[i] = { label: this.finalCategories[i].title, data: [this.finalCategories[i].data] };
    // }
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';
import { ExpenseList } from 'src/app/_model/expense-list';
import { CategoryData } from 'src/app/_model/categoryData';

@Component({
  selector: 'app-donut-chart-categories',
  templateUrl: './donut-chart-categories.component.html',
  styleUrls: ['./donut-chart-categories.component.css']
})
export class DonutChartCategoriesComponent implements OnInit {

  @Input() barExpensesList: ExpenseList[];
  @Input() categories: CategoryData[];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.categories.length; i++) {
      this.doughnutChartLabels.push([this.categories[i].title]);
      this.doughnutChartData[i] = this.barExpensesList[i]['categoryExpenses'];
    }
  }
}

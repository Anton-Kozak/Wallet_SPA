import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseList } from 'src/app/_model/expense-list';
import { CategoryData } from 'src/app/_model/categoryData';
import { MyColors } from 'src/app/_helper/chart-colors';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.css']
})
export class SingleBarChartComponent implements OnInit {

  @Input() barExpensesList: ExpenseList;
  @Input() categories: CategoryData[];
  colors: MyColors = new MyColors();
  labelColor = "black";
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.2,
    scales: { xAxes: [{}], yAxes: [{}] },
    legend: {
      display: true,
      labels: {
        fontColor: '#ffb204',
        fontStyle: 'bold',
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
  public barChartLabels: Label[] = ['Last Expenses'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [];
  

  constructor() { }
  ngOnInit() {
    for (let i = 0; i < this.categories.length; i++) {
      this.barChartData.push({ data: [], label: '' });

      this.barChartData[i] = { label: this.categories[i].title, data: [this.barExpensesList[i]['categoryExpenses']], backgroundColor: this.colors.colors[i].backgroundColor, borderColor: this.colors.colors[i].borderColor, hoverBackgroundColor: this.colors.colors[i].hoverBackgroundColor };
    }
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ExpenseList } from 'src/app/_model/expense-list';

@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.css']
})
export class SingleBarChartComponent implements OnInit {

  @Input() barExpensesList: ExpenseList;
  @Input() testString: string = "";

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
    { data: [], label: 'Housekeeping' },
    { data: [], label: 'Food' },
    { data: [], label: 'Clothes' },
    { data: [], label: 'Entertainment' },
    { data: [], label: 'Other' },
  ];

  constructor() { }

  ngOnInit() {
    this.barChartData[0].data = [this.barExpensesList['houseExpenses']];
    this.barChartData[1].data = [this.barExpensesList['foodExpenses']];
    this.barChartData[2].data = [this.barExpensesList['clothesExpenses']];
    this.barChartData[3].data = [this.barExpensesList['entertainmentExpenses']];
    this.barChartData[4].data = [this.barExpensesList['otherExpenses']];
  }



  //getBarExpensesData(){
  // this.expService.getBarExpensesData().subscribe((data: any)=>{
  //   this.barChartData[0].data = [data['houseExpenses']];
  //   this.barChartData[1].data = [data['foodExpenses']];
  //   this.barChartData[2].data = [data['clothesExpenses']];
  //   this.barChartData[3].data = [data['entertainmentExpenses']];
  //   this.barChartData[4].data = [data['otherExpenses']];
  // }, ()=>{
  //   this.alertify.error("Error retrieving expenses");
  // })
  //} 

}

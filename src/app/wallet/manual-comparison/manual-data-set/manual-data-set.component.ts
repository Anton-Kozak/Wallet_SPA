import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnHeaders } from 'src/app/_helper/columns-headers';
import { CategoryData } from 'src/app/_model/data_models/categoryData';
import { SpecifiedMonthData } from 'src/app/_model/data_models/specifiedMonthData';
import { ExpenseForTable } from 'src/app/_model/expense_models/expense-for-table';

@Component({
  selector: 'app-manual-data-set',
  templateUrl: './manual-data-set.component.html',
  styleUrls: ['./manual-data-set.component.css']
})
export class ManualDataSetComponent implements OnInit {
  @Input() specifiedDataStatistics: SpecifiedMonthData;
  @Input() date: string;
  @Input() currency: string;
  @Input() categories: CategoryData[];
  @ViewChild('paginator') set matPaginator(paginator: MatPaginator) {
    this.expenses.paginator = paginator;
  }

  columnsForExpenses = [
    ColumnHeaders.Title,
    ColumnHeaders.UserName,
    ColumnHeaders.Category,
    ColumnHeaders.MoneySpent,
    ColumnHeaders.Date
  ];
  expenses = new MatTableDataSource<ExpenseForTable>();

  get isCategoriesLengthNotNil(): boolean {
    return !!this.categories.length;
  }

  ngOnInit(): void {
    this.expenses.data = this.specifiedDataStatistics.expenses;
  }
}

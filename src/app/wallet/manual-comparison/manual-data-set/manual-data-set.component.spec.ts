import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDataSetComponent } from './manual-data-set.component';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpecifiedMonthData } from 'src/app/_model/data_models/specifiedMonthData';
describe('ManualDataSetComponent', () => {
  // let component: ManualDataSetComponent;
  // let fixture: ComponentFixture<ManualDataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManualDataSetComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ManualDataSetComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  it('should create', () => {
    const fixture = TestBed.createComponent(ManualDataSetComponent);
    const app = fixture.componentInstance;
    const stat: SpecifiedMonthData = {
      mostSpent: 'James',
      mostUsed: 'James',
      average: 123,
      total: 1234,
      largestExpense: 3456456,
      topFiveUsers: [
        { sum: 123, userName: 'James' },
        { sum: 456, userName: 'Steve' }
      ],
      previousExpensesBars: [
        { id: 1, categoryExpenses: 456 },
        { id: 1, categoryExpenses: 123 },
        { id: 1, categoryExpenses: 678 }
      ],
      expenses: [
        {
          id: 123,
          userName: 'James',
          expenseDescription: 'test',
          expenseTitle: 'Test',
          creationDate: new Date(Date.now()),
          moneySpent: 123,
          expenseCategory: 'test'
        },
        {
          id: 12345,
          userName: 'Mark',
          expenseDescription: 'test2',
          expenseTitle: 'Test2',
          creationDate: new Date(Date.now()),
          moneySpent: 6578,
          expenseCategory: 'test2'
        },
        {
          id: 123678,
          userName: 'Steve',
          expenseDescription: 'test3',
          expenseTitle: 'Test3',
          creationDate: new Date(Date.now()),
          moneySpent: 234,
          expenseCategory: 'tes3t'
        }
      ]
    };
    app.specifiedDataStatistics = stat;
    app.expenses.data = stat.expenses;
    expect(app).toBeTruthy();
  });
});

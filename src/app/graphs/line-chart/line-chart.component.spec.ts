import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  // let component: LineChartComponent;
  // let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartComponent],
      imports: [
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
  //   fixture = TestBed.createComponent(LineChartComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    const fixture = TestBed.createComponent(LineChartComponent);
    const app = fixture.componentInstance;
    const lastSixMonths = [
      { month: 'January', expenseSum: 123 },
      { month: 'asfsf', expenseSum: 456 },
      { month: 'Janujhgfdgjhary', expenseSum: 6789 },
      { month: 'ktyuku', expenseSum: 13456376 }
    ];
    app.lastSixMonths = lastSixMonths;
    expect(app).toBeTruthy();
  });
});

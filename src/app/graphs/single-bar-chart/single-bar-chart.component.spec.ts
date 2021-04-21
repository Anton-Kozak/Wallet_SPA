import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { SingleBarChartComponent } from './single-bar-chart.component';

describe('SingleBarChartComponent', () => {
  // let component: SingleBarChartComponent;
  // let fixture: ComponentFixture<SingleBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBarChartComponent],
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

  it('should create', () => {
    const fixture = TestBed.createComponent(SingleBarChartComponent);
    const app = fixture.componentInstance;
    const categories = [
      { id: 1, title: 'string' },
      { id: 1, title: 'string' },
      { id: 1, title: 'string' },
      { id: 1, title: 'string' }
    ];
    app.categories = categories;

    expect(app).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartCategoriesComponent } from './donut-chart-categories.component';

describe('DonutChartCategoriesComponent', () => {
  let component: DonutChartCategoriesComponent;
  let fixture: ComponentFixture<DonutChartCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

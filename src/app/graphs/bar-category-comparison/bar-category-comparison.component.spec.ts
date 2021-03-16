import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCategoryComparisonComponent } from './bar-category-comparison.component';

describe('BarCategoryComparisonComponent', () => {
  let component: BarCategoryComparisonComponent;
  let fixture: ComponentFixture<BarCategoryComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarCategoryComparisonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCategoryComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

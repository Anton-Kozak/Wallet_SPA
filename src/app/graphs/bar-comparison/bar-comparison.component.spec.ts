import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarComparisonComponent } from './bar-comparison.component';

describe('BarComparisonComponent', () => {
  let component: BarComparisonComponent;
  let fixture: ComponentFixture<BarComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarComparisonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

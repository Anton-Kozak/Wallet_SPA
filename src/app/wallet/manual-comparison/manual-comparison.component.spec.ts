import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualComparisonComponent } from './manual-comparison.component';

describe('ManualComparisonComponent', () => {
  let component: ManualComparisonComponent;
  let fixture: ComponentFixture<ManualComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManualComparisonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

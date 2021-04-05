import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDataSetComponent } from './manual-data-set.component';

describe('ManualDataSetComponent', () => {
  let component: ManualDataSetComponent;
  let fixture: ComponentFixture<ManualDataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualDataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPreviousExpensesComponent } from './show-previous-expenses.component';

describe('ShowPreviousExpensesComponent', () => {
  let component: ShowPreviousExpensesComponent;
  let fixture: ComponentFixture<ShowPreviousExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPreviousExpensesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPreviousExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithExpensesComponent } from './table-with-expenses.component';

describe('TableWithExpensesComponent', () => {
  let component: TableWithExpensesComponent;
  let fixture: ComponentFixture<TableWithExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableWithExpensesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

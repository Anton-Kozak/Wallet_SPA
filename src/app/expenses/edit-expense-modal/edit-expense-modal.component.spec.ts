import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseModalComponent } from './edit-expense-modal.component';

describe('EditExpenseModalComponent', () => {
  let component: EditExpenseModalComponent;
  let fixture: ComponentFixture<EditExpenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpenseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

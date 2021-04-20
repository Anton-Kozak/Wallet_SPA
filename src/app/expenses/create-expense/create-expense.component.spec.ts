import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { CreateExpenseComponent } from './create-expense.component';

describe('CreateExpenseComponent', () => {
  let component: CreateExpenseComponent;
  let fixture: ComponentFixture<CreateExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExpenseComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],

      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

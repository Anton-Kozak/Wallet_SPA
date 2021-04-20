import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { InitialNavbarComponent } from './initial-navbar.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('InitialNavbarComponent', () => {
  let component: InitialNavbarComponent;
  let fixture: ComponentFixture<InitialNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InitialNavbarComponent],
      imports: [
        HttpClientTestingModule,
        // RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

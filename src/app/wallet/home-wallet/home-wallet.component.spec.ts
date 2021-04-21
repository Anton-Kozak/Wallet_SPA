import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';

import { HomeWalletComponent } from './home-wallet.component';

describe('HomeWalletComponent', () => {
  let component: HomeWalletComponent;
  let fixture: ComponentFixture<HomeWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWalletComponent],
      imports: [
        // HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

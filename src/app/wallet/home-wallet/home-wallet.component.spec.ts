import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWalletComponent } from './home-wallet.component';

describe('HomeWalletComponent', () => {
  let component: HomeWalletComponent;
  let fixture: ComponentFixture<HomeWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWalletComponent ]
    })
    .compileComponents();
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAdminComponent } from './wallet-admin.component';

describe('WalletAdminComponent', () => {
  let component: WalletAdminComponent;
  let fixture: ComponentFixture<WalletAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

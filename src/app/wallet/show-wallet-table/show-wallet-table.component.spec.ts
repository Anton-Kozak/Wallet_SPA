import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWalletTableComponent } from './show-wallet-table.component';

describe('ShowWalletTableComponent', () => {
  let component: ShowWalletTableComponent;
  let fixture: ComponentFixture<ShowWalletTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWalletTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWalletTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

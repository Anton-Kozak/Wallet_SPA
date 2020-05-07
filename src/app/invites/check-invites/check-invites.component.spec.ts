import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInvitesComponent } from './check-invites.component';

describe('CheckInvitesComponent', () => {
  let component: CheckInvitesComponent;
  let fixture: ComponentFixture<CheckInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, TestBed } from '@angular/core/testing';

import { PieGraphComponent } from './pie-graph.component';

describe('PieGraphComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PieGraphComponent]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PieGraphComponent);
    const app = fixture.componentInstance;
    const users = [
      { sum: 123, userName: 'string' },
      { sum: 456, userName: 'string' },
      { sum: 789, userName: 'string' },
      { sum: 1235, userName: 'string' }
    ];
    app.topFiveUsers = users;
    expect(app).toBeTruthy();
  });
});

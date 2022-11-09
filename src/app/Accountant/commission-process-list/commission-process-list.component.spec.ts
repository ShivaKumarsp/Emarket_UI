import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionProcessListComponent } from './commission-process-list.component';

describe('CommissionProcessListComponent', () => {
  let component: CommissionProcessListComponent;
  let fixture: ComponentFixture<CommissionProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionProcessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConsignmentComponent } from './check-consignment.component';

describe('CheckConsignmentComponent', () => {
  let component: CheckConsignmentComponent;
  let fixture: ComponentFixture<CheckConsignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckConsignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckConsignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConsignmentVendorComponent } from './check-consignment-vendor.component';

describe('CheckConsignmentVendorComponent', () => {
  let component: CheckConsignmentVendorComponent;
  let fixture: ComponentFixture<CheckConsignmentVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckConsignmentVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckConsignmentVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

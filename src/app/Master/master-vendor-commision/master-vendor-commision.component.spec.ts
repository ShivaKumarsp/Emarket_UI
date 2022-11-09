import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterVendorCommisionComponent } from './master-vendor-commision.component';

describe('MasterVendorCommisionComponent', () => {
  let component: MasterVendorCommisionComponent;
  let fixture: ComponentFixture<MasterVendorCommisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterVendorCommisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterVendorCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

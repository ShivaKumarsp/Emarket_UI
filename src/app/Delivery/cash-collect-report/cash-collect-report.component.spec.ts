import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollectReportComponent } from './cash-collect-report.component';

describe('CashCollectReportComponent', () => {
  let component: CashCollectReportComponent;
  let fixture: ComponentFixture<CashCollectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCollectReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCollectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

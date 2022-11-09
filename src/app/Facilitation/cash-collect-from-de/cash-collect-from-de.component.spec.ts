import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollectFromDeComponent } from './cash-collect-from-de.component';

describe('CashCollectFromDeComponent', () => {
  let component: CashCollectFromDeComponent;
  let fixture: ComponentFixture<CashCollectFromDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCollectFromDeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCollectFromDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

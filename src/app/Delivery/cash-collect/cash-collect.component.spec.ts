import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollectComponent } from './cash-collect.component';

describe('CashCollectComponent', () => {
  let component: CashCollectComponent;
  let fixture: ComponentFixture<CashCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

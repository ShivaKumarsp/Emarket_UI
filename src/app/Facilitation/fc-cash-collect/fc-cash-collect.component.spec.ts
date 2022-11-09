import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcCashCollectComponent } from './fc-cash-collect.component';

describe('FcCashCollectComponent', () => {
  let component: FcCashCollectComponent;
  let fixture: ComponentFixture<FcCashCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcCashCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcCashCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

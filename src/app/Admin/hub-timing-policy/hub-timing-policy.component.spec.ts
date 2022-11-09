import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubTimingPolicyComponent } from './hub-timing-policy.component';

describe('HubTimingPolicyComponent', () => {
  let component: HubTimingPolicyComponent;
  let fixture: ComponentFixture<HubTimingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubTimingPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubTimingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

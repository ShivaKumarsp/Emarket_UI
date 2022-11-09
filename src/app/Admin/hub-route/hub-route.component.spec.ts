import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubRouteComponent } from './hub-route.component';

describe('HubRouteComponent', () => {
  let component: HubRouteComponent;
  let fixture: ComponentFixture<HubRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

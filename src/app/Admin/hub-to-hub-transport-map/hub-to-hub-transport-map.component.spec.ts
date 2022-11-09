import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToHubTransportMapComponent } from './hub-to-hub-transport-map.component';

describe('HubToHubTransportMapComponent', () => {
  let component: HubToHubTransportMapComponent;
  let fixture: ComponentFixture<HubToHubTransportMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubToHubTransportMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToHubTransportMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

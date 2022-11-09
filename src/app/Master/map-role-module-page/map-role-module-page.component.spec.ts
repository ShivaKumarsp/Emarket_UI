import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRoleModulePageComponent } from './map-role-module-page.component';

describe('MapRoleModulePageComponent', () => {
  let component: MapRoleModulePageComponent;
  let fixture: ComponentFixture<MapRoleModulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRoleModulePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRoleModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

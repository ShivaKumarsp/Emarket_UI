import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountUserComponent } from './create-account-user.component';

describe('CreateAccountUserComponent', () => {
  let component: CreateAccountUserComponent;
  let fixture: ComponentFixture<CreateAccountUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

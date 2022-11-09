import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUserListComponent } from './account-user-list.component';

describe('AccountUserListComponent', () => {
  let component: AccountUserListComponent;
  let fixture: ComponentFixture<AccountUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

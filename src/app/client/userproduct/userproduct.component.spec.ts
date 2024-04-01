import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserproductComponent } from './userproduct.component';

describe('UserproductComponent', () => {
  let component: UserproductComponent;
  let fixture: ComponentFixture<UserproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserproductComponent]
    });
    fixture = TestBed.createComponent(UserproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

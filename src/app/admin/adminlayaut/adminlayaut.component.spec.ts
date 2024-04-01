import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlayautComponent } from './adminlayaut.component';

describe('AdminlayautComponent', () => {
  let component: AdminlayautComponent;
  let fixture: ComponentFixture<AdminlayautComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminlayautComponent]
    });
    fixture = TestBed.createComponent(AdminlayautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincategoriesFormComponent } from './admincategories-form.component';

describe('AdmincategoriesFormComponent', () => {
  let component: AdmincategoriesFormComponent;
  let fixture: ComponentFixture<AdmincategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

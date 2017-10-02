import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngredientsComponent } from './admin-ingredients.component';

describe('AdminIngredientsComponent', () => {
  let component: AdminIngredientsComponent;
  let fixture: ComponentFixture<AdminIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

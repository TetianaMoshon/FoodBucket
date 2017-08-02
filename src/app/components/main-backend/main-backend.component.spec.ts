import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBackendComponent } from './main-backend.component';

describe('MainBackendComponent', () => {
  let component: MainBackendComponent;
  let fixture: ComponentFixture<MainBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

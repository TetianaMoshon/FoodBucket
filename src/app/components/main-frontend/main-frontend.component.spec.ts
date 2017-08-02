import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFrontendComponent } from './main-frontend.component';

describe('MainFrontendComponent', () => {
  let component: MainFrontendComponent;
  let fixture: ComponentFixture<MainFrontendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFrontendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

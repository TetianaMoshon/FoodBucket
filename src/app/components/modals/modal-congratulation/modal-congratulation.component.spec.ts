import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCongratulationComponent } from './modal-congratulation.component';

describe('ModalCongratulationComponent', () => {
  let component: ModalCongratulationComponent;
  let fixture: ComponentFixture<ModalCongratulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCongratulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

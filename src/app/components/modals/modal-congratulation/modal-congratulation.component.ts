import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-modal-congratulation',
  templateUrl: './modal-congratulation.component.html',
  styleUrls: ['./modal-congratulation.component.css']
})
export class ModalCongratulationComponent implements OnInit {
  public title = 'Congratulation modal window';
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.css']
})
export class CongratulationComponent implements OnInit {
    public title = 'Congratulation!';
    public text = 'Thanks for your registration!'
    constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}

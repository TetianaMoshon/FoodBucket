import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.css']
})
export class CongratulationComponent implements OnInit {
    private title = 'Thank you for using us';
    public text = 'Thanks for your registration!';
    constructor(
        public bsModalRef: BsModalRef,
        private data: DataService
    ) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.text = message);
  }
}

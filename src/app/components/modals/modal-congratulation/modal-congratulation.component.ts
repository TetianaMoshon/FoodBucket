import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {DataService} from '../../../services/data/data.service';

@Component({
    selector: 'app-modal-congratulation',
    templateUrl: './modal-congratulation.component.html',
    styleUrls: ['./modal-congratulation.component.css'],
})
export class ModalCongratulationComponent implements OnInit {
    public title = 'Congratulation modal window';
    constructor(
        public bsModalRef: BsModalRef,
        private data: DataService
    ) {
    }

    ngOnInit() {

        this.data.currentMessage.subscribe(message => this.title = message);
        console.log('model cong on init com');

        ////this.data.currentMessage.subscribe(message => this.title = message);
    }

    // newMessage(text: string) {
    //     this.data.changeMessage(text);
    // }

}

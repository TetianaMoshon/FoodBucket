import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

import {ConfirmationComponent} from '../confirmation/confirmation.component';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

    public title = 'Password recovering!';
    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

    public openConfirm() {
        this.modalService.show(ConfirmationComponent);
    }

    ngOnInit() {
    }

}

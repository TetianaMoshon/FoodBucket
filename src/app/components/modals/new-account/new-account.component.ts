import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../client/api/auth.service';
import { User } from './user';
import { Register } from '../../../client/model/register';
import { CongratulationComponent } from '../congratulation/congratulation.component';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
    public title = 'Create Your Account';
    model: Register;
    constructor(public bsModalRef: BsModalRef,
                private registerAPI: AuthService,
                private modalService: BsModalService,
                public data: DataService
    ) {
        this.model = new User('', '', '', '', '', '');
    }
    public sendNewAccToDB() {
        this.registerAPI.registerWithHttpInfo(this.model)
            .subscribe(reg => {
            if (reg.ok ) {
                this.openModal('Registration is completed');
            } else {
                this.openModal('Ooops, smth went wrong!');
            }
        }, err => {
                    console.log('error reg' + err);
                    this.openModal('Sorry, you are\'t logged. Try again please!');
                });
    }
    public  openModal(text: string) {
        this.data.changeMessage(text);
        this.modalService.show(CongratulationComponent);
    }
    ngOnInit() {
    }

}

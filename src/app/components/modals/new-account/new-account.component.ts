import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../client/api/auth.service';
import { User } from './user';
import { Register } from '../../../client/model/register';
import { CongratulationComponent } from '../congratulation/congratulation.component';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
    public title = 'Create Your Account';
    model: Register;
    destructedObj = {};
    constructor(public bsModalRef: BsModalRef, private registerAPI: AuthService, private modalService: BsModalService) {
        this.model = new User('', '', '', '', '', '');
    }
    public sendNewAccToDB() {
        const {firstName, lastName, email, password, city, address} = this.model;
        this.destructedObj = { firstName, lastName, email, password, city, address };
        console.log(this.destructedObj);
        this.registerAPI.registerWithHttpInfo({firstName, lastName, email, password, city, address}).subscribe(reg => {
            if (reg.ok ) {
                this.openCongratulation();
            } else {
                //
            }
        });
    }
    public  openCongratulation() {
        this.modalService.show(CongratulationComponent);
    }
    ngOnInit() {
    }

}

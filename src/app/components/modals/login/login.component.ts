///<reference path="../../../services/data/data.service.ts"/>
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewAccountComponent } from '../new-account/new-account.component';
import { ForgotPassComponent } from '../forgot-pass/forgot-pass.component';
import { AuthService } from '../../../client/api/auth.service';
import { Login } from '../../../client/model/login';
import { User } from './user';
import { ModalCongratulationComponent } from '../modal-congratulation/modal-congratulation.component';
import {DataService} from '../../../services/data/data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    public title = 'Login to Foodbucket';
    model: Login;
    constructor(
        public bsModalRef: BsModalRef,
        private loginAPI: AuthService,
        private modalService: BsModalService,
        public data: DataService
    ) {
        this.model = new User('', '');
    }
    public logInOperation() {
        this.loginAPI.loginWithHttpInfo(this.model).subscribe(reg => {
            if (reg.ok) {
                this.openCongratulation();
            } else {
                //
            }
        });
    }
    public openNewAccount() {
        this.modalService.show(NewAccountComponent);
    }

    public  openCongratulation() {
        this.data.changeMessage('Log In Completed', 'Thank you, you are logged');
        this.modalService.show(ModalCongratulationComponent);
    }
    public openForgotPass() {
        this.modalService.show(ForgotPassComponent);
    }
    ngOnInit() {
  }
}

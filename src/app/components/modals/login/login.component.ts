import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

import  {NewAccountComponent} from "../new-account/new-account.component";
import  {CongratulationComponent} from "../congratulation/congratulation.component";
import  {ForgotPassComponent} from "../forgot-pass/forgot-pass.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public title = 'Login to Foodbucket';
    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

    public openNewAccount() {
        this.modalService.show(NewAccountComponent);
    }
    public  openCongratulation(){
        this.modalService.show(CongratulationComponent);
    }
    public openForgotPass(){
        this.modalService.show(ForgotPassComponent);
    }
  ngOnInit() {
  }

}

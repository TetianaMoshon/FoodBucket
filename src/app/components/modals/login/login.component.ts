import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public title = 'Login to Foodbucket';
    constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}

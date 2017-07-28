import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import  {LoginComponent} from "../modals/login/login.component";
import  {NewAccountComponent} from "../modals/new-account/new-account.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isCollapsed = true;
    constructor(private modalService: BsModalService) { }

	  public openNewAccount() {
	        this.modalService.show(NewAccountComponent);
	    }
	    public openLoginModal() {
	        this.modalService.show(LoginComponent);
	    }
  ngOnInit() {
  }

}

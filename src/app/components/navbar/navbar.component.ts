import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import  {LoginComponent} from "../modals/login/login.component";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isCollapsed = true;
    constructor(private modalService: BsModalService) { }

    public openLoginModal() {
        this.modalService.show(LoginComponent);
    }
    ngOnInit() {
    }

}

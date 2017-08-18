import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import  {LoginComponent} from "../modals/login/login.component";
import  {NewAccountComponent} from "../modals/new-account/new-account.component";
import {CartBoxComponent} from "../modals/cart/cart-box/cart-box.component";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [BsModalRef]
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }
    public openNewAccount() {
        this.modalService.show(NewAccountComponent);
    }
    public openLoginModal() {
        this.modalService.show(LoginComponent);
    }
    public openCartModal() {
        this.modalService.show(CartBoxComponent);
    }
    ngOnInit() {
    }




}

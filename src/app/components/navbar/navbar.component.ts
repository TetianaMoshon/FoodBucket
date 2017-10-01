import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {LoginComponent} from '../modals/login/login.component';
import {NewAccountComponent} from '../modals/new-account/new-account.component';
import {CartBoxComponent} from '../modals/cart/cart-box/cart-box.component';
import { DataService} from '../../services/data/data.service';
import {CartCommunicationService} from '../../services/cart-communication.service';
import {AuthService} from '../../client/api/auth.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    LogBtnText;
    isCollapsed = true;
    isLogged;
    isAdmin;

    constructor(private modalService: BsModalService,
                private data: DataService,
                private cartCommunicationService: CartCommunicationService,
                public auth: AuthService,
    ) { }

    ngOnInit() {
        this.data.currentIsLogged.subscribe(message => {
            this.isLogged = message;
            this.cartCommunicationService.userIsLoggedIn = !message;
        });
        this.data.currentLogBtn.subscribe(message => this.LogBtnText = message);
        this.data.currentIsAdmin.subscribe( boolmsg => this.isAdmin = boolmsg);
    }

    public logOutFunc() {
        sessionStorage.clear();
        this.isLogged = false;
        this.cartCommunicationService.userIsLoggedIn = false;
        window.location.reload();
    }
    public openNewAccount() {
        this.modalService.show(NewAccountComponent);
    }
    public openLoginModal() {
        this.modalService.show(LoginComponent);
    }
    public openCartModal() {
        this.modalService.show(CartBoxComponent);
    }
}

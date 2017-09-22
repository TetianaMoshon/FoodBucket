import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {LoginComponent} from '../modals/login/login.component';
import {NewAccountComponent} from '../modals/new-account/new-account.component';
import {CartBoxComponent} from '../modals/cart/cart-box/cart-box.component';
import { DataService} from '../../services/data/data.service';
import {CartCommunicationService} from '../../services/cart-communication.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    LogBtnText = 'Log in / Registration'
    isCollapsed = true;
    isLogged = true;
    showCart = false;

    constructor(private modalService: BsModalService,
                private data: DataService,
                private cartCommunicationService: CartCommunicationService
    ) { }

    ngOnInit() {
        this.data.currentIsLogged.subscribe(message => this.isLogged = message);
        this.data.currentLogBtn.subscribe(message => this.LogBtnText = message);


        this.cartCommunicationService.canShowCart$.subscribe(canShow => {
            if (canShow) {
                this.showCart = true;
            } else {
                this.showCart = false;
            }

        });
    }

    public logOutFunc() {
        sessionStorage.clear();
        this.isLogged = false;
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

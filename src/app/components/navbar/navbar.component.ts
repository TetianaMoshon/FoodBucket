import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {LoginComponent} from '../modals/login/login.component';
import {NewAccountComponent} from '../modals/new-account/new-account.component';
import {CartBoxComponent} from '../modals/cart/cart-box/cart-box.component';
import { DataService} from '../../services/data/data.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    isCollapsed = true;
    isLogged = true;
    constructor(private modalService: BsModalService, private data: DataService) { }

    ngOnInit() {
        this.data.currentIsLogged.subscribe(message => this.isLogged = message);
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

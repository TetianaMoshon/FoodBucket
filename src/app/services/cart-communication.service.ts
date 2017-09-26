import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {CartService} from '../client/api/cart.service';
import {FlashMessagesService} from 'ngx-flash-messages';


@Injectable()
export class CartCommunicationService {
    passedData$ = new Subject();
    userIsLoggedIn: boolean;

  constructor(private cartService: CartService, private flashMessagesService: FlashMessagesService) { }


    getIdOfLoggedInUserFromSessionStorage() {
        if (JSON.parse(sessionStorage.getItem('currentUserId'))) {
            return JSON.parse(sessionStorage.getItem('currentUserId'));
        } else {
            return -1;
        }

    }

    deleteCartAndLocalReferences() {
        const idOfLoggedinUser = this.getIdOfLoggedInUserFromSessionStorage();
        if (idOfLoggedinUser > -1) {
            this.cartService.deleteCartContentById(idOfLoggedinUser).subscribe(
                deletedCart => {
                    console.log('deletedCart: ', deletedCart);
                },
                err => console.log(err)
            );
        } else {
            console.log(`You need to log in first! `);
        }

    }


}

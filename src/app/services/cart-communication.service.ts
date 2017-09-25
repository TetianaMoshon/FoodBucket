import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {CartService} from '../client/api/cart.service';
import {FlashMessagesService} from 'ngx-flash-messages';


@Injectable()
export class CartCommunicationService {
    passedData$ = new Subject();
    canShowCart$ = new Subject();
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
        if (idOfLoggedinUser > -1 &&  JSON.parse(localStorage.getItem('cartContentObjCreated'))) {
            this.cartService.deleteCartContentById(idOfLoggedinUser).subscribe(
                deletedCart => {
                    console.log('deletedCart: ', deletedCart);
                },
                err => console.log(err)
            );

            localStorage.setItem('arrayOfCartOrders', JSON.stringify(null));
            localStorage.setItem('showAPhrase', JSON.stringify(true));
            localStorage.setItem('cartContentObjCreated', JSON.stringify(false));
        } else {
            console.log(`YOU HAVE ALREADY DELETED CART `);
        }

    }


    findOutWhetherCartCreated() {
        const idOfLoggedinUser = this.getIdOfLoggedInUserFromSessionStorage();
        if (idOfLoggedinUser > -1) {
            this.cartService.findCartContentById(idOfLoggedinUser).subscribe(
                cartData => {
                    // 1. if cartContent exists let's initialize cartContentObjCreated to true
                    // 2. let's populate arrayOfCartOrders with db's content
                    // 3. let's initialize showAPhrase to false
                    if (cartData) {
                        // 1.
                        localStorage.setItem('cartContentObjCreated', JSON.stringify(true));
                        // 2.
                        // retrieve array of cartOrders of logged in user
                         const {orderedProducts} = cartData;
                         localStorage.setItem('arrayOfCartOrders', JSON.stringify(orderedProducts));
                        // 3.
                        localStorage.setItem('showAPhrase', JSON.stringify(false));
                    } else {
                        // 1. if cartContent exists let's initialize cartContentObjCreated to false
                        // 2. let's initialize showAPhrase to true
                        // 1.
                        localStorage.setItem('cartContentObjCreated', JSON.stringify(false));
                        localStorage.setItem('arrayOfCartOrders', JSON.stringify([]));
                        // 2.
                        localStorage.setItem('showAPhrase', JSON.stringify(true));
                    }

                }
            );
        } else {
            this.flashMessagesService.show(`You need to log in first!`, {
                classes: ['alert', 'alert-danger'],
                timeout: 3000,
            });
        }
    }

}

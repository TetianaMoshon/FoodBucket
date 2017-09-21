import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {CartService} from '../client/api/cart.service';

@Injectable()
export class CartCommunicationService {
    passedData = new Subject();

  constructor(private cartService: CartService) { }

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
                        // 2. let's make arrayOfCartOrders empty
                        // 3. let's initialize showAPhrase to true
                        // 1.
                        localStorage.setItem('cartContentObjCreated', JSON.stringify(false));
                        // // 2.
                        // const arr = [];
                        // localStorage.setItem('arrayOfCartOrders', JSON.stringify(arr));
                        // 3.
                        localStorage.setItem('showAPhrase', JSON.stringify(true));
                    }

                }
            );
        } else {
            console.log(`YOU NEED TO LOG IN FIRST`);
        }
    }

}

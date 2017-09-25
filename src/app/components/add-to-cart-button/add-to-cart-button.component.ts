import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {CartService} from '../../client/api/cart.service';
import {CartCommunicationService} from '../../services/cart-communication.service';
import {Subject} from 'rxjs/Subject';
import {FlashMessagesService} from 'ngx-flash-messages';
import 'rxjs/add/operator/debounceTime';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent implements OnInit, OnDestroy {

    title = `Buy Now`;
    cartContentObjCreated = false;
    arrayOfCartOrders = [];
    idOfLoggedinUser: number;
    watchClickEvent$ = new Subject();
    clicked = false;
    subscription: Subscription;

  constructor(
      private cartService: CartService,
      private cartCommunicationService: CartCommunicationService,
      private elementRef: ElementRef, private renderer: Renderer2,
      private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
      this.idOfLoggedinUser = this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage();
      // this.arrayOfCartOrders = JSON.parse(localStorage.getItem('arrayOfCartOrders')) || [];

      this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
         this.watchClickEvent$.next(event.path[1].attributes.id.nodeValue);
      });
      this.subscription = this.watchClickEvent$
          .debounceTime(250)
          .subscribe(id => {
              this.cartService.findCartContentById(this.idOfLoggedinUser).subscribe(res => console.log(res));
          if (!this.clicked) {
              this.clicked = true;
              if (this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage() > -1) {
                  this.addProductToCart(id);
              } else {
                  this.flashMessagesService.show(`You need to log in first!`, {
                      classes: ['alert', 'alert-danger'],
                      timeout: 3000,
                  });
              }

          } else {
              this.flashMessagesService.show(`You have already added this product to cart!`, {
                  classes: ['alert', 'alert-success'],
                  timeout: 3000,
              });
          }

      });
  }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addProductToCart(id) {
        // lets see if db has already cart of the user
        this.cartCommunicationService.findOutWhetherCartCreated();

        if (!JSON.parse(localStorage.getItem('cartContentObjCreated'))) {
            // let's create cartOrder
            const newCartOrder = {
                productId: parseInt(id),
                // when cart is first created quantity is 1
                quantity: 1
            };
            const newCart = {
                orderedProducts: [
                    newCartOrder
                ],
                // when cart is first created total price is initialized to zero as it's calculated in cart-box.component.ts
                totalPriceOfAllDishes: 0
            };

              this.cartService.createCartForUserById(this.idOfLoggedinUser, newCart).subscribe(
                cart => {
                    localStorage.setItem('cartContentObjCreated', JSON.stringify(true));
                    localStorage.setItem('showAPhrase', JSON.stringify(false));
                    const {orderedProducts} = cart;
                    orderedProducts.forEach(cartOrder => {
                        this.arrayOfCartOrders.push(cartOrder);
                    });
                    // let's make this.arrayOfCartOrders available throughout the whole app
                    localStorage.setItem('arrayOfCartOrders', JSON.stringify(this.arrayOfCartOrders));
                },
                err => console.log('Error has happened ' + err )
            );

            this.flashMessagesService.show(`Added to cart!`, {
                classes: ['alert', 'alert-success'],
                timeout: 3000,
            });

            // let's show cart icon
            this.cartCommunicationService.canShowCart$.next(true);

        } else {
                 // add cartOrders to the created cartContentObjCreated
                this.addNewProduct(id);
                this.flashMessagesService.show(`Added to cart!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
            // let's show cart icon
            this.cartCommunicationService.canShowCart$.next(true);
        }
    }

    private addNewProduct(id) {
// let's sink this.arrayOfCartOrders with db as user may have changed amount of products



        this.cartService.findCartContentById(this.idOfLoggedinUser).subscribe(
            cartData => {

                // retrieve array of cartOrders of logged in user
                const {orderedProducts} = cartData;
                this.arrayOfCartOrders = orderedProducts;

                // let's push new CartOrder into arrayOfCartOrders
                this.arrayOfCartOrders.push({productId: parseInt(id), quantity: 1});
                localStorage.setItem('arrayOfCartOrders', JSON.stringify(this.arrayOfCartOrders));
                // let's created updatedCartOrder
                console.log('array with added items ', this.arrayOfCartOrders);
                const updatedCart = {
                    orderedProducts: this.arrayOfCartOrders,
                    // when cart is first created total price is the price of a clicked product
                    totalPriceOfAllDishes: 0
                };

                this.cartService.updateCartContentById(this.idOfLoggedinUser, updatedCart).subscribe(updatedData => {
                    console.log('updatedCart returned from backend ', updatedData);
                });

            }
        );
    }

}

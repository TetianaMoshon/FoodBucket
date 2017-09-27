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
    watchClickEvent$ = new Subject();
    subscription: Subscription;

  constructor(
      private cartService: CartService,
      private cartCommunicationService: CartCommunicationService,
      private elementRef: ElementRef, private renderer: Renderer2,
      private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
         this.watchClickEvent$.next(event.path[1].attributes.id.nodeValue);
      });
      this.subscription = this.watchClickEvent$
          .debounceTime(250)
          .subscribe(id => {
          if (this.cartCommunicationService.userIsLoggedIn) {
                  this.addProductToCart(id);
          } else {
              this.flashMessagesService.show(`You need to log in first!`, {
                  classes: ['alert', 'alert-danger'],
                  timeout: 3000,
              });
          }

      });
  }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addProductToCart(id) {
           this.cartService.findCartContentById(this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage())
            .subscribe(data => {
                if (data === undefined) {
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

                    this.cartService.createCartForUserById(this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage(), newCart)
                        .subscribe(
                        cart => {
                            console.log('Cart is created ' + cart )
                        },
                        err => console.log('Error has happened ' + err )
                    );
                    this.flashMessagesService.show(`Added to cart!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });

                } else {
                // add cartOrders to the created cartContentObjCreated
                      this.addNewProduct(id);
                }
            });

    }

    private addNewProduct(id) {

        this.cartService.findCartContentById(this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage()).subscribe(
            cartData => {
                // retrieve array of cartOrders of logged in user
                const {orderedProducts} = cartData;
                 // let's check whether id is already in this.arrayOfCartOrders
                if (orderedProducts.find(curElement => curElement.productId === parseInt(id))) {
                     this.flashMessagesService.show(`You have already added this product to cart!`, {
                        classes: ['alert', 'alert-danger'],
                        timeout: 3000,
                    });
                } else {
                    // let's push new CartOrder into arrayOfCartOrders
                    orderedProducts.push({productId: parseInt(id), quantity: 1});
                    // let's created updatedCartOrder
                    const updatedCart = {
                        orderedProducts: orderedProducts,
                        // when cart is first created total price is the price of a clicked product
                        totalPriceOfAllDishes: 0
                    };

                    this.cartService.updateCartContentById(this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage(), updatedCart)
                        .subscribe(updatedData => {
                        console.log('updatedCart returned from backend ', updatedData);
                    });
                     this.flashMessagesService.show(`Added to cart!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });


                }


            }
        );
    }

}

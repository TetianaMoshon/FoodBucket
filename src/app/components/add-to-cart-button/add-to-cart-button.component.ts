import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {CartService} from '../../client/api/cart.service';
import {ProductService} from '../../client/api/product.service';

@Component({
  selector: 'add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent implements OnInit {

    @Input() productId: number;
    title = `Buy Now`;
    cartContentObjCreated = false;
    arrayOfCartOrders = [];
    idOfLoggedinUser: number;

  constructor(
      private cartService: CartService,
      private productService: ProductService,
      private elementRef: ElementRef, private renderer: Renderer2
  ) {}

  ngOnInit() {
      // if (!JSON.parse(localStorage.getItem('currentUser'))) {
          this.idOfLoggedinUser = this.getIdOfLoggedInUserFromLocalStorage();
      this.arrayOfCartOrders = JSON.parse(localStorage.getItem('arrayOfCartOrders')) || [];
      // } else {
      //     console.log(`You can't buy anything until you log in.`);
      // }

      this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {

          this.addProductToCart(event.path[1].attributes.id.nodeValue);
      });

  }

    addProductToCart(id) {

        // this.cartContentObjCreated = JSON.parse(localStorage.getItem('cartContentObjCreated'));
        if (!JSON.parse(localStorage.getItem('cartContentObjCreated'))) {
            // use POST method and create cart content

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

            console.log('===== newCart =====', newCart);

            this.cartService.createCartForUserById(this.idOfLoggedinUser, newCart).subscribe(
                cart => {
                    localStorage.setItem('cartContentObjCreated', JSON.stringify(true));
                    localStorage.setItem('showAPhrase', JSON.stringify(false));
                    const {orderedProducts} = cart;
                    orderedProducts.forEach(cartOrder => {
                        this.arrayOfCartOrders.push(cartOrder);
                    });
                    // let's make this.arrayOfCartOrders available throughout eht whole app
                    localStorage.setItem('arrayOfCartOrders', JSON.stringify(this.arrayOfCartOrders));
                    console.log('cart saved ' + cart )
                },
                err => console.log('Error has happened ' + err )
            );

        } else {
            if (this.findIdInArray(parseInt(id))) { // here we also update this.arrayOfCartOrders
                console.log('You have already added this product to your cart');
            }else {
                console.log('Let us add new cartOrder to your cart');
                // add cartOrders to the created cartContentObjCreated

                // let's push new CartOrder into arrayOfCartOrders
                this.arrayOfCartOrders.push({productId: parseInt(id), quantity: 1});
                localStorage.setItem('arrayOfCartOrders', JSON.stringify(this.arrayOfCartOrders));
                // console.log(' this.arrayOfCartOrders ',  this.arrayOfCartOrders);
                // let's created updatedCartOrder
                console.log('array with added items ', this.arrayOfCartOrders);
                const updatedCart = {
                    orderedProducts:
                    this.arrayOfCartOrders,
                    // when cart is first created total price is the price of a clicked product
                    totalPriceOfAllDishes: 0
                };

                this.cartService.updateCartContentById(this.idOfLoggedinUser, updatedCart).subscribe(updatedData => {
                    console.log('updatedCart returned from backend ', updatedData);
                });

            }

        }
    }

    private findIdInArray(id) {
        // const isAlreadyInIdArray = this.arrayOfCartOrders.find(cartOrder => {
        //     return cartOrder.productId === parseInt(id);
        //
        // });
        // console.log(`isAlreadyInIdArray ${isAlreadyInIdArray}`);
        // console.log(`isAlreadyInIdArray array`, isAlreadyInIdArray);
        // return isAlreadyInIdArray;

        // get up-to-date arrayOfCartOrders
        this.arrayOfCartOrders = JSON.parse(localStorage.getItem('arrayOfCartOrders'));
        this.arrayOfCartOrders.forEach(cartOrder => {
            if (cartOrder.productId === id) {
                console.log(`Is already in array`);
                return true;
            }
            console.log(`Is'nt in array`);
            return false;
        });

    }

    private getIdOfLoggedInUserFromLocalStorage() {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            return user.userId;
        } else {
            return;
        }
    }

}

import { Component, OnInit } from '@angular/core';
import {CartService} from '../../client/api/cart.service';
import {ProductService} from '../../client/api/product.service';
import {PagerService} from '../../services/pagination.service';
import {Product} from '../../client/model/product';
import {log} from "util";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
    id: number;
    priceOfChosenProduct;
    cartContentObjCreated = false;
    idOfLoggedinUser = 4444;
    // arrayOfProductsIdsOnFrontEnd = [];
    arrayOfCartOrders = [];

    showHide: boolean;
    products = [];

    constructor(
      private cartService: CartService,
      private productService: ProductService,
      private pagerService: PagerService
  ) { }

  ngOnInit() {
        this.populateIdFieldOfProduct();
  }

    addProductToCart(e) {
                if (!this.cartContentObjCreated) {
                    // use POST method

                    // let's create cartOrder
                    const newCartOrder = {
                        productId: parseInt(e.target.id),
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
                            console.log('What is in the cart ', cart);
                            const {orderedProducts} = cart;
                            orderedProducts.forEach(cartOrder => {
                                this.arrayOfCartOrders.push(cartOrder);
                                this.cartContentObjCreated = true;
                                console.log('Yooooo ', cartOrder);
                            });
                        },
                        err => console.log('Error has happened ' + err )
                    );

            } else {
            if (this.findIdInArray(e)) {

                console.log('You have already added this product to your cart');

                // use GET method to find cart by id
                // this.cartService.findCartContentById(parseInt(e.target.id)).subscribe(
                //     cartContent => {
                //         // retrieve array of productIds from cart
                //         // const {orderedProducts} =  cartContent;
                //         console.log(cartContent);
                //     }
                // );
                // const updatedCart;
                // // use PUT method
                // this.cartService.updateCartContentById().subscribe(
                //
                // );

            }else {
                console.log('Let us add new cartOrder / cartOrders to your cart');
                // add cartOrders to the created cartContentObjCreated

                // let's push new CartOrder into arrayOfCartOrders
              this.arrayOfCartOrders.push({productId: parseInt(e.target.id), quantity: 1});

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

    private findIdInArray(e) {
        const isAlreadyInIdArray = this.arrayOfCartOrders.find(cartOrder => {
            // console.log('findIdInArray(e) works', cartOrder);
            // console.log('Element is in array : ', cartOrder.productId === parseInt(e.target.id));
            return cartOrder.productId === parseInt(e.target.id);

        });
        return isAlreadyInIdArray;
    }

    populateIdFieldOfProduct() {
        this.productService.getAllProducts(0, 20).subscribe(products => {
            products.forEach(product => {
                const {productId : id, title, description, image, price} =  product;
                this.priceOfChosenProduct = price;
                this.products.push({id, title, description, image});
            });

          });

    }
}


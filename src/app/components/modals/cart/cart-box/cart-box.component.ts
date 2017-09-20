import {Component, OnInit, OnDestroy} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {CartService} from '../../../../client/api/cart.service';
import {ProductService} from '../../../../client/api/product.service';
import {CartCommunicationService} from '../../../../services/cart-communication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit, OnDestroy {

    title = 'Cart';
    idOfLoggedinUser = 4444;
    showAPhrase = true;
    totalPriceOfAllDishes = 0;
    arrayOfDishNamesAndPrices = [];
    dataReferenceArray = [];
    subscription: Subscription;
    arrayOfCartOrders = [];
    nameAndSurname;

    constructor(
        public bsModalRef: BsModalRef,
        private router: Router,
        private cartService: CartService,
        private productService: ProductService,
        private cartCommunicationService: CartCommunicationService
    ) { }


    ngOnInit() {
        this.idOfLoggedinUser = this.cartCommunicationService.getIdOfLoggedInUserFromSessionStorage();
        this.showAPhrase = JSON.parse(localStorage.getItem('showAPhrase'));
        this.populateArrayOfDishNamesAndPrices();
        this.subscription = this.cartCommunicationService.passedData.subscribe(
            data => {
                this.calculateTotalPriceToPay(data);
            }
        );
    }

    ngOnDestroy() {
        // Before modal is destroyed let's take care of user's data and save it to database
            this.updateCartContentBasedOnDeletedItemsOnServer(this.arrayOfDishNamesAndPrices);
            this.subscription.unsubscribe();
    }


    populateArrayOfDishNamesAndPrices() {
        if (JSON.parse(localStorage.getItem('cartContentObjCreated'))) {
            this.cartService.findCartContentById(this.idOfLoggedinUser).subscribe(
                cartData => {
                    if (cartData === undefined || cartData === null) {
                        return;
                    } else {
                        // this.showAPhrase = false;
                        // retrieve array of cartOrders of logged in user
                        const {orderedProducts} = cartData;

                        // go through array of cartOrders of logged in user and add each product to arrayOfDishNamesAndPrices
                        orderedProducts.forEach(cartOrder => { // {productId: parseInt(e.target.id), quantity: 1}
                            // retrieve necessary product data
                            this.productService.findProductById(cartOrder.productId).subscribe(
                                product => {
                                    const {title : name, image, price, productId} =  product;
                                    this.arrayOfDishNamesAndPrices.push({image, id : productId, name, price,
                                        quantityOrdered: cartOrder.quantity});
                                    // let's have a copy of arrayOfDishNamesAndPrices
                                    // so we can refer to it later instead of calling our server
                                    this.dataReferenceArray.push({image, id : productId, name, price,
                                        quantityOrdered: cartOrder.quantity});
                                    this.sumUpTotalPriceOfAllDishes(this.arrayOfDishNamesAndPrices);
                                }
                            );
                        });
                    }

                }
            );
        }
    }

    renewArray(id: number) {
        // delete dish from listview
        for (let i = 0; i < this.dataReferenceArray.length; i++) {
            if (this.dataReferenceArray[i].id === id) {
                // delete item from copy array as it is sent to view
                this.dataReferenceArray.splice(i, 1);
                // delete item from arrayOfDishNamesAndPrices as it is used to calculate totalPriceOfAllDishes
                this.arrayOfDishNamesAndPrices.splice(i, 1);
                // let's update modyfied cartContent with some deleted items

                this.updateCartContentBasedOnDeletedItemsOnServer(this.arrayOfDishNamesAndPrices);

                if (this.dataReferenceArray.length === 0) {
                    // let's delete user's cart altogether
                    this.cartService.deleteCartContentById(this.idOfLoggedinUser).subscribe(
                        deletedCart => {
                                        console.log('deletedCart: ', deletedCart);
                                    },
                                    err => console.log(err)
                    );

                    this.showAPhrase = true;
                    localStorage.setItem('showAPhrase', JSON.stringify(true));
                    localStorage.setItem('cartContentObjCreated', JSON.stringify(false));
                }
            }

        }
        this.sumUpTotalPriceOfAllDishes(this.arrayOfDishNamesAndPrices);

    }

    private updateCartContentBasedOnDeletedItemsOnServer(arr) {
        // let's created updatedCartOrder
           if (JSON.parse(localStorage.getItem('cartContentObjCreated'))) {
               const updatedCart = this.extractArrayOfProductData(arr);

            this.cartService.updateCartContentById(this.idOfLoggedinUser, updatedCart).subscribe(updatedData => {
                console.log('updatedCart returned from backend ', updatedData);
            });
        } else {
            return;
        }

    }

    private extractArrayOfProductData(arr) {
        this.arrayOfCartOrders = this.extractCartOrdersArray(arr);
        console.log(` this.arrayOfCartOrders in updateCartContentBasedOnDeletedItemsOnServer `, this.arrayOfCartOrders);
        // let's make sure our totalPriceOfAllDishes is up-to-date
        this.sumUpTotalPriceOfAllDishes(arr);
        const updatedCart = {
            orderedProducts: this.arrayOfCartOrders,
            // when cart is first created total price is the price of a clicked product
            totalPriceOfAllDishes: this.totalPriceOfAllDishes
        };
        return updatedCart;
    }

    private extractCartOrdersArray(arr) {
        const arrayOfCartOrders = [];
        console.log(` I'm in extractCartOrdersArray`);
        arr.forEach(data => {
            console.log(` I'm in extractCartOrdersArray ${data}`);
            const priceForAProduct = this.getPriceById(data.id);
            arrayOfCartOrders.push(
                {
                    productId: parseInt(data.id),
                    quantity: data.price / priceForAProduct
                });
        });
        return arrayOfCartOrders;
    }

    calculateTotalPriceToPay(data) {
        this.populateArrayOfIdsAndPricesWithPriceAndSumUpTotalPriceOfAllDishes(data);
    }

    private populateArrayOfIdsAndPricesWithPriceAndSumUpTotalPriceOfAllDishes(data) {

        for (let i = 0; i < this.arrayOfDishNamesAndPrices.length; i++) {
            if (this.arrayOfDishNamesAndPrices[i].id === data.id) {
                this.arrayOfDishNamesAndPrices[i].price = data.amount * this.dataReferenceArray[i].price;
            }
        }

       this.sumUpTotalPriceOfAllDishes(this.arrayOfDishNamesAndPrices);
    }

    private sumUpTotalPriceOfAllDishes(arr) {
        this.totalPriceOfAllDishes = 0;
        arr.forEach((currValue) => {
            this.totalPriceOfAllDishes += currValue.price;
        });
    }

    getPriceById(id) {
        let price = 0;
            this.dataReferenceArray.forEach(row => {
                    if (row.id === id) {
                        price = row.price;
                    }
                }
            );
            return price;
    }


    hideAndRoute() {
        this.bsModalRef.hide();
        this.router.navigate(['/checkout'], { queryParams: { userId: this.idOfLoggedinUser } });
    }


}





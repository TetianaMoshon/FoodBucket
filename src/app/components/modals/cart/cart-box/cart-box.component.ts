import { Component, OnInit,  TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {CartService} from '../../../../client/api/cart.service';
import {ProductService} from '../../../../client/api/product.service';
import {CartCommunicationService} from '../../../../services/cart-communication.service';

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit {

    title = 'Cart';

    idOfLoggedinUser = 4444;

    cancelPrice = false;
    showAPhrase = false;

    totalPriceOfAllDishes = 0;


    arrayOfDishNamesAndPrices = [];

    dataReferenceArray = [];


    constructor(
        public bsModalRef: BsModalRef,
        private router: Router,
        private cartService: CartService,
        private productService: ProductService,
        private cartCommunicationService: CartCommunicationService
    ) { }

    ngOnInit() {
        this.populateArrayOfDishNamesAndPrices();
        this.cartCommunicationService.passedData.subscribe(
            data => {
                this.calculateTotalPriceToPay(data);
                console.log('data passed', data);
            }
        );

    }

    populateArrayOfDishNamesAndPrices() {
        this.cartService.findCartContentById(this.idOfLoggedinUser).subscribe(
            cartData => {
                   // retrieve array of cartOrders of logged in user
                const {orderedProducts} = cartData;

                if (orderedProducts.length === 0) {this.showAPhrase = true; }
                   // go through array of cartOrders of logged in user and add each product to arrayOfDishNamesAndPrices
                orderedProducts.forEach(cartOrder => {
                    // retrieve necessary product data
                    this.productService.findProductById(cartOrder.productId).subscribe(
                        product => {
                            const {title : name, image, price, productId} =  product;
                             this.arrayOfDishNamesAndPrices.push({image, id : productId, name, price });
                     // let's have a copy of arrayOfDishNamesAndPrices so we can refer to it later instead of calling our server
                            this.dataReferenceArray.push({image, id : productId, name, price });
                            this.sumUpTotalPriceOfAllDishes(this.arrayOfDishNamesAndPrices);
                             console.log('this.arrayOfDishNamesAndPrices.', this.arrayOfDishNamesAndPrices);

                        }
                    );
                });
            }
        );

    }

    renewArray(id: number) {
        // delete dish from listview
        for (let i = 0; i < this.dataReferenceArray.length; i++) {
            if (this.dataReferenceArray[i].id === id) {
                // delete item from copy array as it is sent to view
                this.dataReferenceArray.splice(i, 1);
                // delete item from arrayOfDishNamesAndPrices as it is used to calculate totalPriceOfAllDishes
                this.arrayOfDishNamesAndPrices.splice(i, 1);
                if (this.dataReferenceArray.length === 0) {this.showAPhrase = true; }
            }

        }
        this.sumUpTotalPriceOfAllDishes(this.arrayOfDishNamesAndPrices);

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
        arr.forEach((currValue, index) => {
            this.totalPriceOfAllDishes += currValue.price;
        });
    }

    hideAndRoute() {
        this.bsModalRef.hide();
        this.router.navigate(['/checkout']);
    }

}

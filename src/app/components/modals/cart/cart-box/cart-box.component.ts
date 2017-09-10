import { Component, OnInit,  TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {CartService} from '../../../../client/api/cart.service';
import {ProductService} from '../../../../client/api/product.service';

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit {

    title = 'Cart';
    // totalPriceOfAllDishes: number;
    idOfLoggedinUser = 4444;

    cancelPrice = false;
    showAPhrase = false;
    // indexOfProductInArrayOfDishNamesAndPrices: number;
    totalPriceOfAllDishes = 0;
    indexOfProductInArrayOfDishNamesAndPrices = 0;
   // counterOfAddition = 0;


    arrayOfDishNamesAndPrices = [
        // {image: 'assets/images/baguette-min.jpg',
        //     id: 0, name : 'Bedfordshire clanger', price: 49},
        // {image: 'assets/images/bistro-shrimp-pasta.jpg',
        //     id: 1, name : 'Bangers and mash', price: 56},
        // {image: 'assets/images/breakfast-min.jpg',
        //     id: 2, name : 'Chicken tikka masala', price: 87},
        // {image: 'assets/images/pasta-carbonara.jpg',
        //     id: 3, name : 'Cobbler', price: 37},
        // {image: 'assets/images/cake-pops.jpg',
        //     id: 4, name : 'Beef Wellington', price: 98},
        // {image: 'assets/images/cherry-streusel-cheesecake.jpg',
        //     id: 5, name : 'Black peas', price: 101},
        // {image: 'assets/images/fettuccini-alfredo.jpg',
        //     id: 6, name : 'Black pudding', price: 36}

    ];

    arrayOfIdsAndPrices = [];


    constructor(
        public bsModalRef: BsModalRef,
        private router: Router,
        private cartService: CartService,
        private productService: ProductService
    ) { }

    ngOnInit() {

        this.populateArrayOfDishNamesAndPrices();

        this.arrayOfIdsAndPrices.forEach(row => {
            const { id, moneyToPay } = row;
            console.log(` ((((((( id ${id} moneyToPay ${moneyToPay} )))))))`);
        });



    }

    populateArrayOfDishNamesAndPrices() {
        this.cartService.findCartContentById(this.idOfLoggedinUser).subscribe(
            cartData => {
                // retrieve productId from cart and call it id
                // const {orderedProducts: [{productId : id}]} = cartData;

                // retrieve array of cartOrders of logged in user
                const {orderedProducts} = cartData;

                // go through array of cartOrders of logged in user and add each product to arrayOfDishNamesAndPrices
                orderedProducts.forEach(cartOrder => {
                    // retrieve necessary product data
                    this.productService.findProductById(cartOrder.productId).subscribe(
                        product => {
                            const {title : name, image, price} =  product;
                            // changing id to have a sequence order in array
                            this.indexOfProductInArrayOfDishNamesAndPrices = this.arrayOfDishNamesAndPrices.length;
                            this.arrayOfDishNamesAndPrices.push({image, id : this.indexOfProductInArrayOfDishNamesAndPrices, name, price });
                            console.log('I have pushed into arrayOfDishNamesAndPrices index and necesssary data ' + this.indexOfProductInArrayOfDishNamesAndPrices, {image, id : this.indexOfProductInArrayOfDishNamesAndPrices, name, price });
                            this.indexOfProductInArrayOfDishNamesAndPrices++;
                            // populate arrayOfIdsAndPrices step by step
                            this.populateArrayOfIdsAndPrices();
                            this.sumUpTotalPriceOfAllDishes(this.arrayOfIdsAndPrices);
                        }
                    );
                });



            }
        );

    }

    populateArrayOfIdsAndPrices() {
        console.log('populateArrayOfIdsAndPrices() is called');
        for (let i = 0; i < this.arrayOfDishNamesAndPrices.length; i++) {
            this.arrayOfIdsAndPrices.push({id: i, moneyToPay: null});
        }

    }

    renewArray(id: number) {

        for (let i = 0; i < this.arrayOfDishNamesAndPrices.length; i++) {
            if (this.arrayOfDishNamesAndPrices[i].id === id) {
                this.arrayOfDishNamesAndPrices.splice(i, 1);
                if (this.arrayOfDishNamesAndPrices.length === 0) {this.showAPhrase = true; }
            }

        }


        for (let i = 0; i < this.arrayOfIdsAndPrices.length; i++) {
            if (this.arrayOfIdsAndPrices[i].id === id) {
                this.arrayOfIdsAndPrices[i].moneyToPay = 0;
            }
        }
        this.sumUpTotalPriceOfAllDishes(this.arrayOfIdsAndPrices);

    }

    calculateTotalPriceToPay(data: {totalPriceOfOneDish: number, id: number}) {
        this.populateArrayOfIdsAndPricesWithPriceAndSumUpTotalPriceOfAllDishes(data);

    }

    private populateArrayOfIdsAndPricesWithPriceAndSumUpTotalPriceOfAllDishes(data: { totalPriceOfOneDish: number; id: number }) {
       // let's first change price value in arrayOfDishNamesAndPrices and assign value of data.totalPriceOfOneDish

        for (let i = 0; i < this.arrayOfDishNamesAndPrices.length; i++) {
            if (this.arrayOfDishNamesAndPrices[i].id === data.id) {
                this.arrayOfDishNamesAndPrices[i].price = data.totalPriceOfOneDish;
            }

        }

        for (let i = 0; i < this.arrayOfIdsAndPrices.length; i++) {
            if (this.arrayOfIdsAndPrices[i].id === data.id) {
                this.arrayOfIdsAndPrices[i].moneyToPay = data.totalPriceOfOneDish;
            }
        }
       this.sumUpTotalPriceOfAllDishes(this.arrayOfIdsAndPrices);
    }

    private sumUpTotalPriceOfAllDishes(arr) {
        console.log('sumUpTotalPriceOfAllDishes() is called');
        this.totalPriceOfAllDishes = 0;
        arr.forEach((currValue, index) => {
            this.totalPriceOfAllDishes += currValue.moneyToPay;
            console.log(`number(priceOfdish)# ${index} this.totalPriceOfAllDishes += currValue.moneyToPay = ${this.totalPriceOfAllDishes}`);
        });

        // this.totalPriceOfAllDishes = this.arrayOfIdsAndPrices.reduce((sum, item) => {
        //     console.log(`===sum # ${this.counterOfAddition} ${sum} item ${item.moneyToPay}===`);
        //     this.counterOfAddition++;
        //     return sum += item.moneyToPay;
        // }, 0);
    }

    hideAndRoute() {
        this.bsModalRef.hide();
        this.router.navigate(['/checkout']);
    }

}

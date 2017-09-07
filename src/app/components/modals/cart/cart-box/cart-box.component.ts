import { Component, OnInit,  TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {CartService} from '../../../../client/api/cart.service';

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit {

    title = 'Cart';
    totalPriceOfAllDishes: number;

    cancelPrice = false;
    showAPhrase = false;


    arrayOfDishNamesAndPrices = [
        {image: 'assets/images/baguette-min.jpg',
            id: 0, name : 'Bedfordshire clanger', price: 49},
        {image: 'assets/images/bistro-shrimp-pasta.jpg',
            id: 1, name : 'Bangers and mash', price: 56},
        {image: 'assets/images/breakfast-min.jpg',
            id: 2, name : 'Chicken tikka masala', price: 87},
        {image: 'assets/images/pasta-carbonara.jpg',
            id: 3, name : 'Cobbler', price: 37},
        {image: 'assets/images/cake-pops.jpg',
            id: 4, name : 'Beef Wellington', price: 98},
        {image: 'assets/images/cherry-streusel-cheesecake.jpg',
            id: 5, name : 'Black peas', price: 101},
        {image: 'assets/images/fettuccini-alfredo.jpg',
            id: 6, name : 'Black pudding', price: 36},

    ];

    arrayOfIdsAndPrices = [];


    constructor(
        public bsModalRef: BsModalRef,
        private router: Router,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.totalPriceOfAllDishes = 0;
        this.populateArrayOfIdsAndPrices();
        this.cartService.findCartContentById(111).subscribe(data => console.log(data));
    }

    populateArrayOfIdsAndPrices() {
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
        this.totalPriceOfAllDishes = this.arrayOfIdsAndPrices.reduce(function(sum, item){
            return sum += item.moneyToPay;
        }, 0);

    }

    calculateTotalPriceToPay(data: {totalPriceOfOneDish: number, id: number}) {
        for (let i = 0; i < this.arrayOfIdsAndPrices.length; i++) {
            if (this.arrayOfIdsAndPrices[i].id === data.id) {
                this.arrayOfIdsAndPrices[i].moneyToPay = data.totalPriceOfOneDish;
            }
        }
        this.totalPriceOfAllDishes = this.arrayOfIdsAndPrices.reduce(function(sum, item){
            return sum += item.moneyToPay;
        }, 0);

    }

    hideAndRoute() {
        this.bsModalRef.hide();
        this.router.navigate(['/checkout']);
    }

}

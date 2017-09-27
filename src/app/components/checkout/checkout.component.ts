import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../client/api/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../client/api/product.service';
import {CartCommunicationService} from '../../services/cart-communication.service';
import {FlashMessagesService} from 'ngx-flash-messages';
import {UserService} from '../../client/api/user.service';
import {CartService} from '../../client/api/cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

    constructor(
        private orderService: OrderService,
        private router: ActivatedRoute,
        private routerService: Router,
        private productService: ProductService,
        private cartCommunicationService: CartCommunicationService,
        private flashMessagesService: FlashMessagesService,
        private userService: UserService,
        private cartService: CartService
    ) { }
    phone: string;
    city: string;
    address: string;
    firstName: string;
    prodIdsArr = [];
    quantityArray: number[]= [];
    productTitlesArray: string[] = [];
    userObject = {
        firstName: '',
        lastName: '',
        city: '',
        address: '',
        phone: ''
    };
    userId;
    priceOfOrder;
    totalPrice;
    cartContent;
    ngOnInit() {
        this.userId = this.router.snapshot.queryParams.userId;
        this.userService.findUserById(this.userId).subscribe(res => {
            this.userObject = {
                firstName: res.firstName,
                lastName: res.lastName,
                city: res.city,
                address: res.address,
                phone: res.phone.toString()
            };
        });
        this.cartService.findCartContentById(this.userId).subscribe(res => {
            this.cartContent = res;
            this.totalPrice = res.totalPriceOfAllDishes;
            res.orderedProducts.forEach(product => {
                this.prodIdsArr.push(product.productId);
                this.quantityArray.push(product.quantity);
            });
            this.priceOfOrder = res.totalPriceOfAllDishes;
            this.prodIdsArr.forEach(productId => {
                this.productService.findProductById(productId).subscribe(prod => {
                    this.productTitlesArray.push(prod.title);
                });
            });
        });
        // this.orderedProducts.forEach((product) => {
        //     console.log('Whole product from cart', product);
        //     console.log('ID product from cart', product.productId);
        //     console.log('Quantity product from cart', product.quantity);
        //
        // });
        // if (JSON.parse(localStorage.getItem('newOrder'))) {
        //     this.passedObjFromCart = JSON.parse(localStorage.getItem('newOrder'));
        //
        //     console.log(this.passedObjFromCart);
        //     const arrayOfPassedObjs = this.passedObjFromCart.products;
        //     arrayOfPassedObjs.forEach((data, i) => {
        //             const {productId, quantity} = data;
        //             this.prodIdsArr.push(productId);
        //         }
        //
        //     );
        //     this.passedObjFromCart.products = this.prodIdsArr;
        //     this.prodIdsArr.forEach(productId => {
        //         this.productService.findProductById(productId).subscribe(res => {
        //             this.productTitlesArray.push(res.title);
        //         });
        //     });
        //     this.firstName = this.passedObjFromCart.username.split(' ')[0];
        //     this.surname = this.passedObjFromCart.username.split(' ')[1];
        // }
        //   this.orderInfo = JSON.parse(localStorage.getItem('newOrder'));
        //

        function validateCardNumber(value) {
            const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const matches = v.match(/\d{4,16}/g);
            const match = matches && matches[0] || '';
            const parts = [];
            for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4));
            }
            if (parts.length) {
                return parts.join(' ');
            } else {
                return value;
            }
        }
        const cardInput = (<HTMLInputElement>document.getElementById('card'));
        cardInput.addEventListener('input', function () {
            this.value = validateCardNumber(this.value);
        });
    }
    onSubmit(form: NgForm) {
        const username = this.userObject.firstName + '' + this.userObject.lastName;
        const city = this.userObject.city;
        const address = this.userObject.address;
        const price = this.cartContent.totalPriceOfAllDishes;
        const status = 'New Order';
        const phone = form.value.phone;
        this.orderService.putOrder({
            'username': username,
            'city': city,
            'price': price,
            'address': address,
            'status': status,
            'phone': phone,
            'products': this.prodIdsArr,
            'quantity': this.quantityArray,
        }).subscribe(res => {
            console.log('Result from subscribe that goes to putOrder', res);

        });

        // let's delete cartContent and its references
        this.cartCommunicationService.deleteCartAndLocalReferences();

        this.flashMessagesService.show(`You have placed your order successfully!`, {
            classes: ['alert', 'alert-success'],
            timeout: 7000,
        });
        this.routerService.navigate(['/']);
    }
}






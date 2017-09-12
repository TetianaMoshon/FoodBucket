import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {OrderService} from "../../client/api/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orderService: OrderService ) { }
    surname: string;
    phone: string;
    city: string;
    address: string;
    firstName: string;
    prodIdsArr = [];
    passedObjFromCart;

  ngOnInit() {
      if (JSON.parse(localStorage.getItem('newOrder'))) {
          this.passedObjFromCart = JSON.parse(localStorage.getItem('newOrder'));

          console.log(this.passedObjFromCart);
          const arrayOfPassedObjs = this.passedObjFromCart.products;
          arrayOfPassedObjs.forEach((data, i) => {
                  const {productId, quantity} = data;
                  this.prodIdsArr.push(productId);
                  console.log(`productId #${i} ${productId}, quantity #${i} ${quantity}`);
                  console.log(` this.prodIdsArr `,  this.prodIdsArr);

              }

          );

          this.passedObjFromCart.products = this.prodIdsArr;
          console.log(` this.passedObjFromCart `,  this.passedObjFromCart);


      }



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
    // this.orderService.putOrder(this.passedObjFromCart).subscribe(data=>{
    //     console.log(data);
    // });
        let username = this.passedObjFromCart.username;
        let city = this.passedObjFromCart.city;
        let address = this.passedObjFromCart.address;
        let price = this.passedObjFromCart.price;
        console.log(price);
        let status = 'NEW';
        let phone = form.value.phone;
        this.orderService.putOrder({
            "username": username,
            "city": city,
            "price": price,
            "address": address,
            "status": status,
            "phone": phone,
            "products": this.prodIdsArr
        }).subscribe(res => {
            console.log(res);
        });
    }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ProductService} from '../../client/api/product.service';
import {OrderService} from '../../client/api/order.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    ORDER: any;

  constructor(private route: ActivatedRoute, private products: ProductService, private orderS: OrderService) { }
    surname: string;
    phone: string;
    city: string;
    address: string;
    firstName: string;


  ngOnInit() {
      this.ORDER = JSON.parse(atob(this.route.snapshot.queryParams.order));
      console.log(this.ORDER);
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
      console.log(this.ORDER);
      let username = this.ORDER.username;
      let city = form.value.city;
      let address = form.value.address;
      let price = this.ORDER.price;
      console.log(price);
      let status = 'NEW';
      let phone = form.value.phone;
      let products: number[] = [parseInt(this.ORDER.products[0].productId)];
      console.log(this.ORDER.products[0].productId)
      this.orderS.putOrder({
          "username": username,
          "city": city,
          "price": price,
          "address": address,
          "status": status,
          "phone": phone,
          "products": products
      }).subscribe(res => {
          console.log(res);
      });
    }
}

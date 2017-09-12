import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
    surname: string;
    phone: string;
    city: string;
    address: string;
    firstName: string;


  ngOnInit() {
      if (JSON.parse(localStorage.getItem('newOrder'))) {
          const passedObjFromCart = JSON.parse(localStorage.getItem('newOrder'));

          // const passedObjFromCart = this.route.snapshot.queryParams;
          console.log(passedObjFromCart);
          const arrayOfPassedObjs = passedObjFromCart.products;
          arrayOfPassedObjs.forEach((data, i) => {
                  const {productId, quantity} = data;
                  console.log(`productId #${i} ${productId}, quantity #${i} ${quantity}`);

              }

          );
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
        const orderObject = {
            username: form.value.firstName + ' ' + form.value.surname,
            phone: form.value.phone,
            city: form.value.city,
            address: form.value.address,
        };
        console.log(orderObject);
    }
}

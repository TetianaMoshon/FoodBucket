import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
array = [{
    "date": "27/05/2015",
    "id": "1",
    "name": "John",
    "food": "pizza,pasta,salad",
    "tel": "0682839534",
    "price": "13,37$",
    "status": "delivered",
},
    {
        "date": "27/05/2015",
        "id": "2",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "3",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "4",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    },
    {
        "date": "27/05/2015",
        "id": "5",
        "name": "John",
        "food": "pizza,pasta,salad",
        "tel": "0682839534",
        "price": "13,37$",
        "status": "delivered",
    }];
  constructor() { }

  ngOnInit() {

  }

}

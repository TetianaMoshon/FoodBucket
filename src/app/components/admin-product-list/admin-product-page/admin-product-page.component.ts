import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-page',
  templateUrl: './admin-product-page.component.html',
  styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit {

    settings = {
        actions: {
            position: 'right'
        },
        pager: {
            display: true
        },
        columns: {
            name: {
                title: 'Ingredient name',
            },
            quantity: {
                title: 'Quantity',
                width: '15%',
            },
            measure: {
                title: 'Measure',
                width: '15%',
            },
        },
    };

    data = [
        {
            name: 'Beef',
            quantity: '0.8',
            measure: 'kg',
        },
        {
            name: 'Soy sauce',
            quantity: '50',
            measure: 'ml',
        },
        {
            name: 'Sault',
            quantity: '10',
            measure: 'g',
        },
    ];

  constructor() { }

  ngOnInit() {
  }

}

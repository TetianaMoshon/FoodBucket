import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ImageRenderComponent} from './image-render.component';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {

    settings = {
        actions: {
            position: 'right',
            delete: 'true',
            columnTitle: ' ',
        },

        pager: {
            display: true,
            perPage: 5,
        },
        columns: {
            ingredient_item: {
                title: 'Ingredients',
                filter: true,
                width: '30%',
            },
            ingredient_measure: {
                title: 'Measure',
                width: '13%',
                sort: false,
                filter: true,
            },
            ingredient_quantity: {
                title: 'Warehouse quantity',
                width: '22%',
                filter: true,
            },
            ingredient_price: {
                title: 'Price',
                width: '10%',
                filter: true,
            },
            image: {
                title: 'Image',
                width: '13%',
                type: 'custom',
                sort: false,
                filter: false,
                renderComponent: ImageRenderComponent,
                editor: {
                    type: 'list',
                    config: {
                        list: [ { value: '../../../assets/icons/ingredients/vegetables.svg', title: 'Vegetables' },
                                { value: '../../../assets/icons/ingredients/fruits.svg', title: 'Fruits' },
                                { value: '../../../assets/icons/ingredients/meat.svg', title: 'Meat' },
                                { value: '../../../assets/icons/ingredients/fish.svg', title: 'Fish' },
                                { value: '<../../../assets/icons/ingredients/eggs.svg', title: 'Eggs' },
                                { value: '<../../../assets/icons/ingredients/liquid.svg', title: 'Liquid' },
                                { value: '<../../../assets/icons/ingredients/lactic.svg', title: 'Lactic' },
                                { value: '../../../assets/icons/ingredients/porridge.svg', title: 'Porridge' },
                                { value: '../../../assets/icons/ingredients/sea_food.svg', title: 'Sea food' },
                                { value: '../../../assets/icons/ingredients/salt.svg', title: 'Salt' },
                                { value: '../../../assets/icons/ingredients/sugar.svg', title: 'Sugar' },
                                { value: '../../../assets/icons/ingredients/spices.svg', title: 'Spices' },
                        ],
                    },
                },
            },

        },
    };

    data = [
        {
            ingredient_item: 'Potato',
            ingredient_measure: 'kg',
            ingredient_quantity: 300,
            ingredient_price: 200,
            image: '../../../assets/icons/ingredients/vegetables.svg'
        },
        {
            ingredient_item: 'Salmon',
            ingredient_measure: 'g',
            ingredient_quantity: 105,
            ingredient_price: 45,
            image: '../../../assets/icons/ingredients/fish.svg'
        },
        {
            ingredient_item: 'Shrimp',
            ingredient_measure: 'g',
            ingredient_quantity: 78,
            ingredient_price: 200,
            image: '../../../assets/icons/ingredients/sea_food.svg'
        },
        {
            ingredient_item: 'Apple',
            ingredient_measure: 'items',
            ingredient_quantity: 105,
            ingredient_price: 78,
            image: '../../../assets/icons/ingredients/fruits.svg'
        },
        {
            ingredient_item: 'Oatmeal',
            ingredient_measure: 'g',
            ingredient_quantity: 200,
            ingredient_price: 45,
            image: '../../../assets/icons/ingredients/porridge.svg'
        },
        {
            ingredient_item: 'Milk',
            ingredient_measure: 'ml',
            ingredient_quantity: 200,
            ingredient_price: 200,
            image: '../../../assets/icons/ingredients/lactic.svg'
        },
        {
            ingredient_item: 'Chicken',
            ingredient_measure: 'g',
            ingredient_quantity: 45,
            ingredient_price: 78,
            image: '../../../assets/icons/ingredients/meat.svg'
        },
        {
            ingredient_item: 'Water',
            ingredient_measure: 'ml',
            ingredient_quantity: 105,
            ingredient_price: 45,
            image: '../../../assets/icons/ingredients/liquid.svg'
        },
        {
            ingredient_item: 'Mustard',
            ingredient_measure: 'g',
            ingredient_quantity: 105,
            ingredient_price: 200,
            image: 'src="../../../assets/icons/ingredients/spices.svg'
        },
        {
            ingredient_item: 'Egg',
            ingredient_measure: 'items',
            ingredient_quantity: 105,
            ingredient_price: 40,
            image: '../../../assets/icons/ingredients/eggs.svg'
        }
    ];

    constructor() {
    }


  ngOnInit() {
  }

}

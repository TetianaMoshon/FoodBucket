import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../client/api/product.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'ngx-flash-messages';
import { NgForm } from '@angular/forms';
import { IngredientService } from '../../../client/api/ingredient.service';
import { ProductModel } from './productModel';
import { IngredientModel } from './ingredient-edit/ingredientModel';
// import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-admin-product-page',
    templateUrl: './admin-product-page.component.html',
    styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit, OnDestroy {
    public productData;
    public productIngredients = [];

    ingredientList: IngredientModel[] = [
        // new IngredientModel(1, 'Apples', 5, 'kg'),
        // new IngredientModel(2, 'Tomatoes', 10, 'kg')
    ];

    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;
    rows: any[] = [];

    constructor(
        protected productService: ProductService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService
    ) {
    }

    productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '',  [{ ingredientId: null, ingredientName: '', quantity: null, measure: '' }]);

    ngOnInit() {
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                        seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.fillProduct(parseInt(seg1, 10));

                        this.action = {
                            id: parseInt(seg1, 10),
                            name: seg2
                        };
                    } else {
                        this.action = {
                            id: 0,
                            name: seg1
                        };
                    }
                }
            );
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    onSubmit() {
            this.productModel.price = Number(this.productModel.price);
            this.productModel.status = Boolean(this.productModel.status);
            this.productModel.discount = Number(this.productModel.discount);
            this.productModel.promotions = Boolean(this.productModel.promotions);
            this.productModel.caloricity = Number(this.productModel.caloricity);
            this.productModel.servingSize = Number(this.productModel.servingSize);

            for (let ingredient in this.ingredientList) {
                this.productModel.ingredients[ingredient] = this.ingredientList[ingredient];
                this.productModel.ingredients[ingredient].ingredientId = Number(this.productModel.ingredients[ingredient].ingredientId);
                this.productModel.ingredients[ingredient].quantity = Number(this.productModel.ingredients[ingredient].quantity);
            }

        if (this.action.name === 'create') {
            this.createProduct(this.productModel);
        } else {
            this.updateProduct(this.action.id, this.productModel);
        }
        // console.log(this.ingredientList);
        console.log(this.productModel);
    }

    onIngredientAdded(ingredient: IngredientModel) {
        this.ingredientList.push(ingredient);
    }

    createProduct(productModel) {
        // console.log(this.productModel);
        this.productService.createProduct(productModel)
            .subscribe(
                product => {
                    this.flashMessagesService.show(`Product with id:${product['productId']} was successfully created!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                    this.resetFormFields();
                },
                err => console.log(err)
            );
    }

    updateProduct(id: number, productModel) {
        this.productService.updateProductById(id, productModel)
            .subscribe(
                product => {
                    this.flashMessagesService.show(`Product with id:${id} was successfully updated!`, {
                        classes: ['alert', 'alert-warning'],
                        timeout: 3000,
                    });
                },
                err => console.log(err)
            );
    }

    fillProduct(id: number) {
        this.productService.findProductById(id)
            .subscribe(
                product => {
                    this.productModel.title = product.title;
                    this.productModel.description = product.description;
                    this.productModel.price = product.price;
                    this.productModel.image = product.image;
                    this.productModel.category = product.category;
                    this.productModel.status = product.status;
                    this.productModel.discount = product.discount;
                    this.productModel.promotions = product.promotions;
                    this.productModel.caloricity = product.caloricity;
                    this.productModel.servingSize = product.servingSize;
                    this.productModel.difficulty = product.difficulty;
                    this.productModel.spiceLevel = product.spiceLevel;

                    console.log(product.ingredients); // shows all ingredients from db

                    console.log(product.ingredients.length);
                    const productLength = product.ingredients.length;

                    for (let ingredientItem = 0;  ingredientItem <= productLength; ingredientItem++) {
                        // const table: HTMLTableElement = <HTMLTableElement> document.getElementById('myTable');
                        // this.ingredientList.forEach(x => table.insertRow(table.rows.length + 1));
                    }

                    for (let ingredient in product.ingredients) {
                        // this.productModel.ingredients[ingredient].ingredientId = 12;
                        // this.productModel.ingredients[ingredient].ingredientName = "Test";
                        // this.productModel.ingredients[ingredient].quantity = 3;
                        // this.productModel.ingredients[ingredient].measure = "g";
                        this.productModel.ingredients[ingredient].ingredientId = product.ingredients[ingredient].ingredientId;
                        this.productModel.ingredients[ingredient].ingredientName = product.ingredients[ingredient].ingredientName;
                        this.productModel.ingredients[ingredient].quantity = Number(product.ingredients[ingredient].quantity);
                        this.productModel.ingredients[ingredient].measure = product.ingredients[ingredient].measure;
                        console.log(this.productModel.ingredients[ingredient]);
                    }

                    console.log(this.productModel.ingredients);
                }
            );
    }

    resetFormFields() {
        this.productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '',
            [{ ingredientId: null, ingredientName: '', quantity: null, measure: ''}]);
    }
}

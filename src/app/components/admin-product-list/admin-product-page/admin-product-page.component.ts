import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../client/api/product.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'ngx-flash-messages';
import { NgForm } from '@angular/forms';
import { IngredientService } from '../../../client/api/ingredient.service';
import { ProductModel } from './productModel';
import { IngredientModel } from './ingredient-edit/ingredientModel';

@Component({
    selector: 'app-admin-product-page',
    templateUrl: './admin-product-page.component.html',
    styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit, OnDestroy {
    public productData;
    public productIngredients = [];
    // title: string;
    // description: string;
    // price: number;
    // image: string;
    // category: string;
    // status: boolean;
    // discount: number;
    // promotions: boolean;
    // caloricity: number;
    // servingSize: number;
    // difficulty: string;
    // spiceLevel: string;
    // ingredients: any;
    // ingredientName: string;
    // quantity: number;
    // measure: string;

    ingredientList: IngredientModel[] = [
        new IngredientModel('Apples', 5),
        new IngredientModel('Tomatoes', 10),
    ];

    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;

    constructor(
        protected productService: ProductService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService
    ) { }

    productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '', [{ingredientName: '', quantity: null, measure: ''}]);

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
            this.productModel.ingredients[0].quantity = Number(this.productModel.ingredients[0].quantity);

        if (this.action.name === 'create') {
            this.createProduct(this.productModel);
            // this.resetFormFields();
        } else {
            this.updateProduct(this.action.id, this.productModel);
        }
        // console.log(productObject);
        console.log(this.productModel);
    }


    onIngredientAdded(ingredient: IngredientModel) {
        this.ingredientList.push(ingredient);
    }

    createProduct(productModel) {
        // console.log(productObject);
        console.log(this.productModel);
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
        console.log(productModel);
        this.productService.updateProductById(id, productModel)
            .subscribe(
                product => {
                    this.productData = product;
                    console.log(this.productData);
                    this.flashMessagesService.show(`Product with id:${id} was successfully updated!`, {
                        classes: ['alert', 'alert-warning'],
                        timeout: 3000,
                    });
                    console.log(this.productIngredients);

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
                    // this.ingredients = product.ingredients;
                    this.productModel.ingredients[0].ingredientName = product.ingredients[0].ingredientName;
                    this.productModel.ingredients[0].quantity = product.ingredients[0].quantity;
                    this.productModel.ingredients[0].measure = product.ingredients[0].measure;
                }
            );
    }

    resetFormFields() {
        // this.title = '';
        // this.description = '';
        // this.price = null;
        // this.image = '';
        // this.category = '';
        // this.status = false;
        // this.discount = null;
        // this.promotions = false;
        // this.caloricity = null;
        // this.servingSize = null;
        // this.difficulty = '';
        // this.spiceLevel = '';
        // this.ingredientName = '';
        // this.quantity = null;
        // this.measure = '';
        this.productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '', [{ingredientName: '', quantity: null, measure: ''}])
    }
}

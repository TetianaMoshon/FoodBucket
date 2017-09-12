import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../client/api/product.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'ngx-flash-messages';
import { NgForm } from '@angular/forms';
import { IngredientService } from '../../../client/api/ingredient.service';

@Component({
    selector: 'app-admin-product-page',
    templateUrl: './admin-product-page.component.html',
    styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit, OnDestroy {
    public productData;
    public productIngredients = [];
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    status: boolean;
    discount: number;
    promotions: boolean;
    caloricity: number;
    servingSize: number;
    difficulty: string;
    spiceLevel: string;
    ingredients: any;
    ingredientName: string;
    quantity: number;
    measure: string;

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

    onSubmit(form: NgForm) {
        const productObject = {
            title: form.value.title,
            description: form.value.description,
            image: form.value.image,
            price: Number(form.value.price),
            category: form.value.category,
            status: Boolean(form.value.status),
            discount: Number(form.value.discount),
            promotions: Boolean(form.value.promotions),
            caloricity: Number(form.value.caloricity),
            servingSize: Number(form.value.servingSize),
            difficulty: form.value.difficulty,
            spiceLevel: form.value.spiceLevel,
            ingredients: [{
                ingredientName: form.value.ingredientName,
                quantity: Number(form.value.quantity),
                measure: form.value.measure
            }]
        };

        if (this.action.name === 'create') {
            // const p = {
            //     productId: 150,
            //     title: "string",
            //     description: "string333",
            //     image: "string",
            //     price: 0,
            //     category: "string",
            //     status: true,
            //     discount: 0,
            //     promotions: true,
            //     caloricity: 0,
            //     servingSize: 0,
            //     difficulty: "string",
            //     spiceLevel: "string",
            //     ingredients: [
            //         {
            //             ingredientId: 0,
            //             ingredientName: "stfchring",
            //             quantity: 0
            //         }
            //     ]
            // }
            this.createProduct(productObject);
        } else {
            this.updateProduct(this.action.id, productObject);
        }
        // console.log(productObject);
    }

    createProduct(productObject) {
        // console.log(productObject);

        this.productService.createProduct(productObject)
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

    updateProduct(id: number, productObject) {
        console.log(productObject);
        this.productService.updateProductById(id, productObject)
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
                    this.title = product.title;
                    this.description = product.description;
                    this.image = product.image;
                    this.price = product.price;
                    this.category = product.category;
                    this.status = product.status;
                    this.discount = product.discount;
                    this.promotions = product.promotions;
                    this.caloricity = product.caloricity;
                    this.servingSize = product.servingSize;
                    this.difficulty = product.difficulty;
                    this.spiceLevel = product.spiceLevel;
                    // this.ingredients = product.ingredients;
                    this.ingredientName = product.ingredients[0].ingredientName;
                    this.quantity = product.ingredients[0].quantity;
                    this.measure = product.ingredients[0].measure;
                }
            );
    }

    resetFormFields() {
        this.title = '';
        this.description = '';
        this.image = '';
        this.price = null;
        this.category = '';
        this.status = false;
        this.discount = null;
        this.promotions = false;
        this.caloricity = null;
        this.servingSize = null;
        this.difficulty = '';
        this.spiceLevel = '';
        this.ingredientName = '';
        this.quantity = null;
        this.measure = '';
    }
}

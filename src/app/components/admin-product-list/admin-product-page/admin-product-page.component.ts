import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../client/api/product.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'ngx-flash-messages';
import { NgForm } from '@angular/forms';
import { ProductModel } from './productModel';
import { IngredientModel } from './ingredientModel';
import { Subject } from 'rxjs/Subject';
import {IngredientService} from '../../../client/api/ingredient.service';

@Component({
    selector: 'app-admin-product-page',
    templateUrl: './admin-product-page.component.html',
    styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit, OnDestroy {
    ingredientList: IngredientModel[];

    private subscription: Subscription;
    @ViewChild('f2') ingListForm: NgForm;
    editMode = false;
    editedItemIndex: number;
    editedItem: IngredientModel;

    ingredientsChanged = new Subject<IngredientModel[]>();
    startedEditing = new Subject<number>();

    constructor(
        protected productService: ProductService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService,
        protected ingredientService: IngredientService
    ) {}

    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;

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

        this.ingredientList = this.getIngredientList();

        this.subscription = this.ingredientsChanged
            .subscribe(
                (ingredientList: IngredientModel[]) => {
                    this.ingredientList = ingredientList;
                }
            );

        this.subscription = this.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.getIngredient(index);
                    this.ingListForm.setValue({
                        ingredientId: this.editedItem.ingredientId,
                        ingredientName: this.editedItem.ingredientName,
                        quantity: this.editedItem.quantity,
                        measure: this.editedItem.measure
                    });
                }
            );
    }

    onEditItem(index: number) {
        this.startedEditing.next(index);
    }

    onSubmit(form: NgForm) {
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

    }

    onSubmit2(form: NgForm) {
        const value = form.value;
        const newIngredient = new IngredientModel(value.ingredientId, value.ingredientName, value.quantity, value.measure);
        if (this.editMode) {
            this.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    createProduct(productModel) {
        this.productService.createProduct(productModel)
            .subscribe(
                product => {
                    this.flashMessagesService.show(`Product with id:${product['productId']} was successfully created!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                    // this.resetFormFields();
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

                    product.ingredients.forEach(({ ingredientId, ingredientName, quantity, measure}, index) => {
                        this.productModel.ingredients[index] = { ingredientId, ingredientName, quantity, measure};
                    });
                    this.ingredientList = this.productModel.ingredients;
                }
            );
    }

    resetFormFields() {
        this.productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '',
            [{ ingredientId: null, ingredientName: '', quantity: null, measure: ''}]);
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
        this.subscription.unsubscribe();
    }

    getIngredientList() {
        return this.ingredientList;
    }

    getIngredient(index: number) {
        return this.ingredientList[index];
    }

    addIngredient(ingredient: IngredientModel) {
        this.ingredientList = this.productModel.ingredients;

        this.ingredientList.push(ingredient);
        // this.ingredientsChanged.next(this.ingredientList.slice());
    }

    updateIngredient(index: number, newIngredient: IngredientModel) {
        this.ingredientList[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    deleteIngredient(index: number) {
        this.ingredientList.splice(index, 1);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    onClear() {
        this.ingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

}

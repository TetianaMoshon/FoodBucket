import { Component, OnInit } from '@angular/core';
import { IngredientModel } from './ingredient-edit/ingredientModel';
import { Subject } from 'rxjs/Subject';
import { ProductService } from '../../../client/api/product.service';
import { IngredientService } from '../../../client/api/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { ProductModel } from './productModel';

export class IngredientListService {

    // ingredientsChanged = new Subject<IngredientModel[]>();
    // startedEditing = new Subject<number>();

    public productService: ProductService;
    public ingredientService: IngredientService;
    protected route: ActivatedRoute;

    private ingredientList: IngredientModel[] = [
        // new IngredientModel(1, 'Apples', 5, 'kg'),
        // new IngredientModel(2, 'Tomatoes', 10, 'kg'),
        // new IngredientModel(3, 'Oranges', 15, 'kg'),
    ];

    // getIngredientList() {
    //     return this.ingredientList.slice();
    // }
    //
    // getIngredient(index: number) {
    //     return this.ingredientList[index];
    // }

    // addIngredient(ingredient: IngredientModel) {
    //     this.ingredientList.push(ingredient);
    //     this.ingredientsChanged.next(this.ingredientList.slice());
    // }

    // addIngredients(ingredientList: IngredientModel[]) {
    //     // for (let ingredient of ingredientList) {
    //     //   this.addIngredient(ingredient);
    //     // }
    //     this.ingredientList.push(...ingredientList);
    //     this.ingredientsChanged.next(this.ingredientList.slice());
    // }

    // updateIngredient(index: number, newIngredient: IngredientModel) {
    //     this.ingredientList[index] = newIngredient;
    //     this.ingredientsChanged.next(this.ingredientList.slice());
    //     console.log(this.ingredientList);
    // }
    //
    // deleteIngredient(index: number) {
    //     this.ingredientList.splice(index, 1);
    //     this.ingredientsChanged.next(this.ingredientList.slice());
    // }
}


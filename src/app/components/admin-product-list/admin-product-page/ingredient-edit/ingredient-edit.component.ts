import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IngredientModel } from './ingredientModel';
import { Subscription } from 'rxjs/Subscription';
import { IngredientListService } from './../ingredient-list.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../../client/api/product.service';
import { IngredientService } from '../../../../client/api/ingredient.service';
import { ProductModel } from './../productModel';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {
    @ViewChild('f2') ingListForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: IngredientModel;
    ingredientList: IngredientModel[];

    public productData;
    public productIngredients = [];

    constructor(private ingListService: IngredientListService,
                public productService: ProductService,
                public ingredientService: IngredientService,
                protected route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.ingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    // console.log(this.editedItemIndex);
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
        console.log(this.ingListForm);

        const id = this.route.snapshot.paramMap.get('id');
        // console.log(id);
        this.getProductIngredients(id);
    }
    productModel = new ProductModel('', '', null, '', '', true, null, false, null, null, '', '',  [{ ingredientId: null, ingredientName: '', quantity: null, measure: '' }]);

    getIngredientList() {
        return this.ingredientList.slice();
    }

    getIngredient(index: number) {
        return this.ingredientList[index];
    }

    getProductIngredients(id) {
        this.productService.findProductById(id)
            .subscribe(
                product => {
                    // const current = this;
                    product.ingredients.forEach(({ ingredientId, ingredientName, quantity, measure}, index) => {
                        this.productModel.ingredients[index] = { ingredientId, ingredientName, quantity, measure};
                    });
                    // console.log(this.productModel.ingredients);
                    this.ingredientList = this.productModel.ingredients;
                    console.log(this.ingredientList);
                    return this.ingredientList;
                },
                err => console.log(err)
            );
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new IngredientModel(value.ingredientId, value.ingredientName, value.quantity, value.measure);
        if (this.editMode) {
            this.ingListService.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.ingListService.addIngredient(newIngredient);
        }
        this.editMode = false;
        // console.log(newIngredient);
        form.reset();
    }

    onClear() {
        this.ingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        console.log(this.editedItemIndex);
        this.ingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
        // for (let ingredient in this.ingredientList) {
        //     this.productModel.ingredients[ingredient] = this.ingredientList[ingredient];
        //     this.productModel.ingredients[ingredient].ingredientId = Number(this.productModel.ingredients[ingredient].ingredientId);
        //     this.productModel.ingredients[ingredient].quantity = Number(this.productModel.ingredients[ingredient].quantity);
        // }
        console.log(this.productModel);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

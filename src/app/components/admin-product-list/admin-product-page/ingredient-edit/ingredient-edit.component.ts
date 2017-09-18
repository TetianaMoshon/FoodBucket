import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { IngredientModel } from './ingredientModel';
import { Subscription } from 'rxjs/Subscription';
import { IngredientListService } from './../ingredient-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {
    @ViewChild('f2') ingForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: IngredientModel;

    constructor(private ingListService: IngredientListService) { }

    ngOnInit() {
        this.subscription = this.ingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.ingListService.getIngredient(index);
                    this.ingForm.setValue({
                        id: this.editedItem.ingredientId,
                        ingName: this.editedItem.ingredientName,
                        quantity: this.editedItem.quantity,
                        measure: this.editedItem.measure
                    });
                }
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
        form.reset();
    }

    onClear() {
        this.ingForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.ingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
}

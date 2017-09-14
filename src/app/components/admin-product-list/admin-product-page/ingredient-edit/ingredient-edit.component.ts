import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { IngredientModel } from './ingredientModel';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {

    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;
    @Output() ingredientAdded = new EventEmitter<IngredientModel>();

    constructor() { }

    ngOnInit() {
    }

    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingQuantity = this.amountInputRef.nativeElement.value;
        const newIngredient = new IngredientModel(ingName, ingQuantity);
        this.ingredientAdded.emit(newIngredient);
    }

}

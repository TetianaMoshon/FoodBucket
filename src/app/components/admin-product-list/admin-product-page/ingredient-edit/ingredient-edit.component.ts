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
    @ViewChild('measureInput') measureInputRef: ElementRef;
    @Output() ingredientAdded = new EventEmitter<IngredientModel>();

    constructor() { }

    ngOnInit() {
    }

    onAddItem() {
        const ingredName = this.nameInputRef.nativeElement.value;
        const ingredQuantity = this.amountInputRef.nativeElement.value;
        const ingredMeasure = this.measureInputRef.nativeElement.value;
        const newIngredient = new IngredientModel(ingredName, ingredQuantity, ingredMeasure);
        this.ingredientAdded.emit(newIngredient);
    }

}

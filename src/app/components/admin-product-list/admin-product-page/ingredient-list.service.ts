import { IngredientModel } from './ingredient-edit/ingredientModel';
import { Subject } from 'rxjs/Subject';

export class IngredientListService {

    ingredientsChanged = new Subject<IngredientModel[]>();
    startedEditing = new Subject<number>();
    private ingredientList: IngredientModel[] = [];

    getIngredientList() {
        return this.ingredientList.slice();
    }

    getIngredient(index: number) {
        return this.ingredientList[index];
    }

    addIngredient(ingredient: IngredientModel) {
        this.ingredientList.push(ingredient);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    addIngredients(ingredientList: IngredientModel[]) {
        // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }
        this.ingredientList.push(...ingredientList);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    updateIngredient(index: number, newIngredient: IngredientModel) {
        this.ingredientList[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    deleteIngredient(index: number) {
        this.ingredientList.splice(index, 1);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }
}


import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';
import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Router} from '@angular/router';
import {IngredientService} from '../../client/api/ingredient.service';
import {settings} from './adminingredients-settings';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {

    settings = settings;
    source: LocalDataSource;

    ngOnInit() {
    }

    constructor(
        protected ingredientService: IngredientService,
        private router: Router
    ) {

        this.ingredientService.getAllIngredients(1, 2, 'asc')
            .subscribe(
                ingredients => {
                    this.source = new LocalDataSource();
                    this.source.load(ingredients);
                },
                err => console.log(err)
            );
    }

    onCreateClick(event, eventName: string): void {

        this.changeRoute('/admin/ingredients/create');
    }

    onEditClick(event, eventName: string): void {
        const ingredientId = parseInt(event.cells[0].value);
        this.changeRoute(`/admin/ingredients/${ingredientId}/edit`);
    }

    onDeleteClick(event, eventName: string): void {
        const ingredientId = parseInt(event.cells[0].value);
        if(confirm('Are you really want to delete ingredient with id: ' + ingredientId + ' ?')) {
            this.ingredientService.deleteIngredientById(ingredientId).subscribe(
                () => { this.source.remove(event.data); },
                err => console.log(err)
            );
        }
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue,);
    }




}

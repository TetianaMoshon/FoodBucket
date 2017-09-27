import {PagerService} from '../../services/pagination.service';
import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../client/api/ingredient.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {
    searchInput$ = new Subject<string>();
    sorted: boolean;
    nextSort: string;
    column: string;
    res;
    total;
    offset;
    limit = this.pagerService.getPager(this.total, 1);
    page;
    value: string;
    state = true;
    sort: string;
    ingredients;
    pager: any = {};
    pagedItems: any[];

    constructor(
        protected ingredientService: IngredientService,
        private pagerService: PagerService,
        private router: Router

) {}


    ngOnInit() {
        this.defineOffset(this.limit.pageSize, 1);
        this.ingredientService.getAllIngredientsWithHttpInfo(this.offset, this.limit.pageSize, 'desc', 'ingredient_id' )
            .subscribe(response => {
                this.ingredients = response.json();
                console.log(this.ingredients );
                this.total = response.headers.get('x-total-records');
                this.pager = this.pagerService.getPager(this.total, 1);
                this.pagedItems = this.ingredients;
        });

        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));
    }

    defineCol(value: string) {
        this.column = value;
    }

    search(searchStr) {
        if (searchStr.trim() !== '') {
            this.ingredientService.getAllIngredientsWithHttpInfo(0, this.total, 'desc', 'ingredient_id', searchStr, this.column).subscribe(res =>
                this.pagedItems = res.json());
        } else {
            this.pagedItems = this.ingredients;
        }

        this.pager.currentPage = 1;
    }

    toggle(state: boolean) {
        this.state = state;
        this.sort = this.state ? 'desc' : 'asc';
    }

    defineOffset(limit: number, page: number) {
        this.offset = page * limit - limit;
    }


    setPage(page: number) {
        this.pagedItems = [];
        this.defineOffset(this.limit.pageSize, page);
        if (this.sorted) {
            this.ingredientService.getAllIngredients(this.offset, this.limit.pageSize, this.nextSort, this.value ).subscribe(ingredients => {
                this.pagedItems = ingredients;
            });
        } else  {
            this.ingredientService.getAllIngredients( this.offset, this.limit.pageSize, 'desc', 'ingredient_id').subscribe(ingredients => {
                this.pagedItems = ingredients;
            });
        }

        this.pager.currentPage = page;
    }

    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        this.ingredientService.getAllIngredients(this.offset, this.limit.pageSize, this.sort, value ).subscribe(ingredients => {
            this.value = value;
            this.pagedItems = ingredients;
        });
        this.sorted = true;
        this.nextSort = this.sort;
    }

    onCreateClick(event): void {
        this.changeRoute('/admin/ingredients/create');
    }

    onEditClick(event, id): void {
        this.changeRoute(`/admin/ingredients/${id}/edit`);
    }

    onDeleteClick(event, id): void {
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        if (confirm('Are you really want to delete ingredient with id: ' + id + ' ?')) {
            this.ingredientService.deleteIngredientById(parseInt(id, 10)).subscribe(
                ingredient => {
                    this.ingredientService.getAllIngredientsWithHttpInfo(0, this.limit.pageSize, 'desc', 'ingredient_id').subscribe(
                        ingredients => {
                            this.pagedItems = ingredients.json();
                            this.total = ingredients.headers.get('x-total-records');
                            this.pager = this.pagerService.getPager(this.total, 1);
                        },
                        err => console.log(err)
                    );
                },
                err => console.log(err)
            );
        }
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue);
    }


}

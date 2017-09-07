import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {CategoryService} from '../../client/api/category.service';
import {settings} from './admincategories-settings';

@Component({
    selector: 'app-admincategories',
    templateUrl: './admincategories.component.html',
    styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

    settings = settings;
    source: LocalDataSource;

    ngOnInit() {

    }

    constructor(
        protected categoryService: CategoryService,
        private router: Router
    ) {

        this.categoryService.getAllCategories(1, 2, true)
            .subscribe(
                categories => {
                    this.source = new LocalDataSource();
                    this.source.load(categories);
                },
                err => console.log(err)
            );
    }

    onCreateClick(event, eventName: string): void {

        this.changeRoute('/admin/categories/create');
    }

    onEditClick(event, eventName: string): void {
        const categoryId = parseInt(event.cells[0].value);
        this.changeRoute(`/admin/categories/${categoryId}/edit`);
    }

    onDeleteClick(event, eventName: string): void {
        const categoryId = parseInt(event.cells[0].value);
        if(confirm('Are you really want to delete category with id: ' + categoryId + ' ?')) {
            this.categoryService.deleteCategoryById(categoryId).subscribe(
                () => { this.source.remove(event.data); },
                err => console.log(err)
            );
        }
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue,);
    }
}

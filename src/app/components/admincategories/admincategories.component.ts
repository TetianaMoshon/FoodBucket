import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../client/api/category.service';
import 'rxjs/add/observable/concat';

@Component({
    selector: 'app-admincategories',
    templateUrl: './admincategories.component.html',
    styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

    source;

    ngOnInit() {

    }

    constructor(
        protected categoryService: CategoryService,
        private router: Router
    ) {

        this.categoryService.getAllCategories(1, 2, true)
            .subscribe(
                categories => {
                    this.source = categories;
                },
                err => console.log(err)
            );
    }

    onCreateClick(event) {
        this.changeRoute('/admin/categories/create');
    }

    onEditClick(event, id) {
        this.changeRoute(`/admin/categories/${id}/edit`);
    }

    onDeleteClick(event, id) {
        if (confirm('Are you really want to delete category with id: ' + id + ' ?')) {
            this.categoryService.deleteCategoryById(parseInt(id, 10)).subscribe(
                category => {
                    this.categoryService.getAllCategories(1, 2, true).subscribe(
                        categories => {
                            this.source = categories;
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

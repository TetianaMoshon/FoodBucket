import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../../client/api/category.service';

@Component({
    selector: 'app-admincategories',
    templateUrl: './admincategories.component.html',
    styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

    source;
    random;

    ngOnInit() {
        this.fetchData();
        this.random = Date.now();
    }

    constructor(
        protected categoryService: CategoryService,
        private router: Router
    ) { }

    fetchData() {
        this.categoryService.getAllCategories(0, 5, 'desc', 'category_id')
            .subscribe(
                categories => {
                    this.source = categories;
                },
                err => console.log(err)
            );
    }

    onCreateClick(event): void {
        this.changeRoute('/admin/categories/create');
    }

    onEditClick(event, id): void {
        this.changeRoute(`/admin/categories/${id}/edit`);
    }

    onDeleteClick(event, id): void {
        if (confirm('Are you really want to delete category with id: ' + id + ' ?')) {
            this.categoryService.deleteCategoryById(parseInt(id, 10)).subscribe(
                category => {
                    this.categoryService.getAllCategories(1, 2, 'desc', 'category_id').subscribe(
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

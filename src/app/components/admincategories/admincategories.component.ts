import {Component, OnInit} from '@angular/core';
import {PagerService} from '../../services/pagination.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../client/api/category.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-admincategories',
    templateUrl: './admincategories.component.html',
    styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

    source;
    random;

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
    categories;
    pager: any = {};

    ngOnInit() {
        this.fetchData();
        this.random = Date.now();
    }

    constructor(
        protected categoryService: CategoryService,
        private router: Router,
        private pagerService: PagerService
    ) { }

    fetchData() {
        // this.categoryService.getAllCategories(1, 2, 'desc')
        //     .subscribe(
        //         categories => {
        //             this.source = categories;
        //         },
        //         err => console.log(err)
        //     );

        this.defineOffset(this.limit.pageSize, 1);
        this.categoryService.getAllCategoriesWithHttpInfo(this.offset, this.limit.pageSize, 'desc', 'category_id')
            .subscribe(
                response => {
                    this.categories = response.json();
                    this.total = response.headers.get('x-total-records');
                    this.pager = this.pagerService.getPager(this.total, 1);
                    this.source = this.categories;

                },
                err => console.log(err)

            );
        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));

    }

    onCreateClick(event): void {
        this.changeRoute('/admin/categories/create');
    }

    onEditClick(event, id): void {
        this.changeRoute(`/admin/categories/${id}/edit`);
    }

    onDeleteClick(event, id): void {
        this.defineOffset(this.limit.pageSize, this.pager.currentPage)
        if (confirm('Are you really want to delete category with id: ' + id + ' ?')) {
            this.categoryService.deleteCategoryById(parseInt(id, 10)).subscribe(
                category => {
                    this.categoryService.getAllCategoriesWithHttpInfo(0, this.limit.pageSize, 'desc', 'category_id').subscribe(
                        categories => {
                            this.source = categories.json();
                            this.total = categories.headers.get('x-total-records');
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

    defineCol(value: string) {
        this.column = value;
    }

    search(searchStr) {
        if (searchStr.trim() !== '') {
            this.categoryService.getAllCategoriesWithHttpInfo(0, this.limit.pageSize, 'desc', 'category_id', searchStr, this.column)
                .subscribe(res => {
                    this.source = res.json();
                    this.pager = this.pagerService.getPager(this.limit.pageSize, 1); }
                );
        } else {
            this.source = this.categories;
            this.pager = this.pagerService.getPager(this.total, 1);
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
        this.source = [];
        this.defineOffset(this.limit.pageSize, page);
        if (this.sorted) {
            this.categoryService.getAllCategories(this.offset, this.limit.pageSize, this.nextSort, this.value )
                .subscribe(categories => {
                    this.source = categories;
                });
        } else  {
            this.categoryService.getAllCategories( this.offset, this.limit.pageSize, 'desc', 'category_id')
                .subscribe(categories => {
                    this.source = categories;
                });
        }

        this.pager.currentPage = page;
    }


    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        this.categoryService.getAllCategories(this.offset, this.limit.pageSize, this.sort, value ).subscribe(categories => {
            this.value = value;
            this.source = categories;
        });
        this.sorted = true;
        this.nextSort = this.sort;
    }


}

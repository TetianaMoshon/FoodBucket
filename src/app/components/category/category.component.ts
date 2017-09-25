import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../client/api/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

    source;


    constructor(private categoryService: CategoryService) {
        this.categoryService.getAllCategories(1, 2, true)
            .subscribe(
                categories => {
                    this.source = categories;
                },
                err => console.log(err)
            );
    }

    ngOnInit() {
    }
}

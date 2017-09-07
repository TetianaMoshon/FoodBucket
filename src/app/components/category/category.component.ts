import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../client/api/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {

    }
}

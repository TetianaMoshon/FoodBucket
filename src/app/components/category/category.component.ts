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
        // this.categoryService.findCategoryById(34)
        //     .subscribe(
        //         category => {
        //             console.log('findCategoryById: ', category);
        //         },
        //         err => console.log(err)
        //     );
        //
        // this.categoryService.getAllCategories(1, 2, true)
        //     .subscribe(
        //         categories => {
        //             console.log('getAllCategories: ', categories);
        //         },
        //         err => console.log(err)
        //     );
        //
        // const categoryNewObject = {
        //     categoryId: -1,
        //     title: 'minusOneTitle',
        //     image: 'minusOneImage',
        //     description: 'minusOneDescription'
        // };
        // this.categoryService.createCategory(categoryNewObject)
        //     .subscribe(
        //         category => {
        //             console.log('createCategory: ', category);
        //         },
        //         err => console.log(err)
        //     );
        //
        // this.categoryService.deleteCategoryById(37)
        //     .subscribe(
        //         category => {
        //             console.log('deleteCategory: ', category);
        //         },
        //         err => console.log(err)
        //     );
        //
        // const categoryUpdateObject = {
        //     categoryId: -1,
        //     title: 'minusOneTitle',
        //     image: 'minusOneImage',
        //     description: 'minusOneDescription'
        // };
        // this.categoryService.updateCategoryById(34, categoryUpdateObject)
        //     .subscribe(
        //         category => {
        //             console.log('updateCategory: ', category);
        //         },
        //         err => console.log(err)
        //     );
    }
}

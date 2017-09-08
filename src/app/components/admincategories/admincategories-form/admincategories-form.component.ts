import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Router, ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../client/api/category.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'ngx-flash-messages';

@Component({
    selector: 'app-admincategories-form',
    templateUrl: './admincategories-form.component.html',
    styleUrls: ['./admincategories-form.component.css']
})
export class AdmincategoriesFormComponent implements OnInit, OnDestroy {

    title: string;
    image: string;
    description: string;
    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;

    constructor(
        protected categoryService: CategoryService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService
    ) { }

    ngOnInit() {
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                          seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.fillCategory(parseInt(seg1, 10));

                        this.action = {
                            id: parseInt(seg1, 10),
                            name: seg2
                        };
                    } else {
                        this.action = {
                            id: 0,
                            name: seg1
                        };
                    }
                }
            );
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    onSubmit(form: NgForm) {
        const categoryObject = {
            title: form.value.title,
            image: form.value.image,
            description: form.value.description
        };

        if (this.action.name === 'create') {
            this.createCategory(categoryObject);
        } else {
            this.updateCategory(this.action.id, categoryObject);
        }
    }

    createCategory(categoryObject) {
        this.categoryService.createCategory(categoryObject)
            .subscribe(
                category => {
                    this.flashMessagesService.show(`Category with id:${category['category_id']} was successfully created!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                    this.resetFormFields();
                },
                err => console.log(err)
            );
    }

    updateCategory(id: number, categoryObject) {
        this.categoryService.updateCategoryById(id, categoryObject)
            .subscribe(
                category => {
                    this.flashMessagesService.show(`Category with id:${id} was successfully updated!`, {
                        classes: ['alert', 'alert-warning'],
                        timeout: 3000,
                    });

                },
                err => console.log(err)
            );
    }

    fillCategory(id: number) {
        this.categoryService.findCategoryById(id)
            .subscribe(
                category => {
                    this.title = category.title;
                    this.image = category.image;
                    this.description = category.description;
                },
                err => console.log(err)
            );
    }

    resetFormFields() {
        this.title = '';
        this.image = '';
        this.description = '';
    }
}

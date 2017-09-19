import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../client/api/category.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'ngx-flash-messages';
import Buffer from 'buffer/';

@Component({
    selector: 'app-admincategories-form',
    templateUrl: './admincategories-form.component.html',
    styleUrls: ['./admincategories-form.component.css']
})
export class AdmincategoriesFormComponent implements OnInit, OnDestroy {

    title: string;
    image: string;
    description: string;
    imageSrc: string = '';
    imageBuffer;
    file;

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
            console.log(this.imageBuffer);

            this.categoryService.uploadCategoryImageById(85, this.imageBuffer)
                .subscribe(arg => {
                    console.log(arg);
                }, err => {console.log(err);});

            //this.createCategory(categoryObject);
        } else {
            this.updateCategory(this.action.id, categoryObject);
        }
    }

    onFileChange(e) {
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        const pattern = /image-*/;
        const reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        reader.onloadend = this.onReaderLoaded.bind(this);
        reader.readAsDataURL(file);
        // reader.readAsArrayBuffer(this.file);
    }

    private onReaderLoaded(e) {
        const reader = e.target;
        this.imageSrc = reader.result;

        // const matches = this.imageSrc.match(/^data:.+\/(.+);base64,(.*)$/);
        // const ext = matches[1];
        // const base64_data = matches[2];
        // this.imageBuffer = new Buffer(base64_data, 'base64');
        // this.imageBuffer = Buffer.from(arrayBuffer)
        // this.imageBuffer = Buffer.Buffer.from(base64_data);
        this.imageBuffer = Buffer.Buffer.from(this.imageSrc);
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

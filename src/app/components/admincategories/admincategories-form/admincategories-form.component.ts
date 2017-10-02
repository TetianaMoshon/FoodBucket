import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../client/api/category.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from 'ngx-flash-messages';
import {ImageService} from '../../../services/image/image.service';

@Component({
    selector: 'app-admincategories-form',
    templateUrl: './admincategories-form.component.html',
    styleUrls: ['./admincategories-form.component.css']
})
export class AdmincategoriesFormComponent implements OnInit, OnDestroy {

    title: string;
    imageUpload: string;
    imageSrc: string = '';
    description: string;
    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;
    file: File = null;

    constructor(
        protected categoryService: CategoryService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService,
        private imageService: ImageService
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

    onFileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];

            const pattern = /image-*/;
            const reader = new FileReader();

            if (!this.file.type.match(pattern)) {
                alert('Invalid image format. Only .jpg and .png are available');
                return;
            }

            reader.onloadend = this.onReaderLoaded.bind(this);
            reader.readAsDataURL(this.file);
        }
    }

    private onReaderLoaded(e) {
        const reader = e.target;
        this.imageSrc = reader.result;
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
    }

    onSubmit(form: NgForm) {

        const categoryObject = {
            title: form.value.title,
            image: 'empty path',
            description: form.value.description
        };

        if (this.action.name === 'create') {
            this.createCategory(categoryObject);
        } else { // edit
            if (this.file === null) {
                categoryObject.image = this.imageSrc.replace('image/', '');
            }
            this.updateCategory(this.action.id, categoryObject);
        }
    }

    createCategory(categoryObject) {
        this.categoryService.createCategory(categoryObject)
            .subscribe(
                category => {
                    if (this.file !== null) {
                        this.uploadCategoryImageById(parseInt(category['category_id'], 10), this.file, 'post');
                    }

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
                    if (this.file !== null) {
                        this.uploadCategoryImageById(id, this.file, 'put');
                    }

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
                    this.description = category.description;
                    this.imageSrc = 'image/' + category.image;
                },
                err => console.log(err)
            );
    }

    uploadCategoryImageById(id, file, method) {
        const entityName = 'category';
        this.imageService.uploadImageByEntityId(id, file, method, entityName);
    }

    resetFormFields() {
        this.title = '';
        this.imageUpload = '';
        this.description = '';
        this.imageSrc = '';
    }


}

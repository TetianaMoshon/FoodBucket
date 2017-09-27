import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../client/api/product.service';
import { Subscription } from 'rxjs/Subscription';
import { FlashMessagesService } from 'ngx-flash-messages';
import { NgForm } from '@angular/forms';
import { ProductModel } from './productModel';
import { IngredientModel } from './ingredientModel';
import { Subject } from 'rxjs/Subject';
import {ImageService} from '../../../services/image/image.service';
import {CategoryService} from '../../../client/api/category.service';


@Component({
    selector: 'app-admin-product-page',
    templateUrl: './admin-product-page.component.html',
    styleUrls: ['./admin-product-page.component.css']
})
export class AdminProductPageComponent implements OnInit, OnDestroy {
    ingredientList: IngredientModel[] = [];

    private subscription: Subscription;
    @ViewChild('f2') ingListForm: NgForm;
    editMode = false;
    editedItemIndex: number;
    editedItem: IngredientModel;

    ingredientsChanged = new Subject<IngredientModel[]>();
    startedEditing = new Subject<number>();

    imageSrc;
    file;
    categoryList = [];

    constructor(
        protected productService: ProductService,
        protected route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService,
        private imageService: ImageService,
        private categoryService: CategoryService
    ) {}

    action: {
        id: number,
        name: string
    };
    urlSubscription: Subscription;

    productModel = new ProductModel('', '', null, '', '', null, false, null, null, '', '',  [{ ingredientId: null, ingredientName: '', quantity: null, measure: '' }]);

    ngOnInit() {
        this.urlSubscription = this.route.url
            .subscribe(
                (segments) => {
                    const seg1 = segments[0].path,
                        seg2 = segments[1] !== undefined ? segments[1].path : '';

                    if (!isNaN(parseInt(seg1, 10)) && seg2 === 'edit') {

                        this.fillProduct(parseInt(seg1, 10));

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

        this.ingredientList = this.getIngredientList();

        this.subscription = this.ingredientsChanged
            .subscribe(
                (ingredientList: IngredientModel[]) => {
                    this.ingredientList = ingredientList;
                }
            );

        this.subscription = this.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.getIngredient(index);
                    this.ingListForm.setValue({
                        ingredientId: this.editedItem.ingredientId,
                        ingredientName: this.editedItem.ingredientName,
                        quantity: this.editedItem.quantity,
                        measure: this.editedItem.measure
                    });
                }
            );

        this.categoryService.getAllCategories(0, 20)
            .subscribe(categories => {
                categories.forEach(category => {
                    this.categoryList.push(category.title);
                });
            });
    }

    onEditItem(index: number) {
        this.startedEditing.next(index);
    }

    onSubmit(form: NgForm) {
        this.productModel.price = Number(this.productModel.price);
        this.productModel.discount = Number(this.productModel.discount);

        this.productModel.promotions = this.BooleanConverter(this.productModel.promotions);

        this.productModel.caloricity = Number(this.productModel.caloricity);
        this.productModel.servingSize = Number(this.productModel.servingSize);

        this.ingredientList.forEach(({ ingredientId, ingredientName, quantity, measure}, index) => {
            this.productModel.ingredients[index] = { ingredientId, ingredientName, quantity, measure};
            this.productModel.ingredients[index].ingredientId = Number(this.productModel.ingredients[index].ingredientId);
            this.productModel.ingredients[index].quantity = Number(this.productModel.ingredients[index].quantity);
        });

        if (this.action.name === 'create') {
            this.createProduct(this.productModel);
        } else {
            if (this.file === null) {
                this.productModel.image = this.imageSrc.replace('image/', '');
            }
            this.updateProduct(this.action.id, this.productModel);
        }

    }

    onSubmit2(form: NgForm) {
        const value = form.value;
        const newIngredient = new IngredientModel(value.ingredientId, value.ingredientName, value.quantity, value.measure);
        if (this.editMode) {
            this.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    createProduct(productModel) {
        this.productService.createProduct(productModel)
            .subscribe(
                product => {
                    if (this.file !== null) {
                        this.uploadProductImageById(product.productId, this.file, 'post');
                    }

                    this.flashMessagesService.show(`Product with id:${product['productId']} was successfully created!`, {
                        classes: ['alert', 'alert-success'],
                        timeout: 3000,
                    });
                    this.resetFormFields();
                },
                err => console.log(err)
            );
    }

    uploadProductImageById(id, file, method) {
        const entityName = 'product';
        this.imageService.uploadImageByEntityId(id, file, method, entityName);
    }

    updateProduct(id: number, productModel) {
        this.productService.updateProductById(id, productModel)
            .subscribe(
                product => {
                    if (this.file !== null) {
                        this.uploadProductImageById(id, this.file, 'put');
                    }

                    this.flashMessagesService.show(`Product with id:${id} was successfully updated!`, {
                        classes: ['alert', 'alert-warning'],
                        timeout: 3000,
                    });
                },
                err => console.log(err)
            );
    }

    fillProduct(id: number) {
        this.productService.findProductById(id)
            .subscribe(
                product => {
                    this.productModel.title = product.title;
                    this.productModel.description = product.description;
                    this.productModel.price = product.price;
                    this.imageSrc = 'image/' + product.image;
                    this.productModel.category = product.category;
                    this.productModel.discount = product.discount;
                    this.productModel.promotions = product.promotions;
                    this.productModel.caloricity = product.caloricity;
                    this.productModel.servingSize = product.servingSize;
                    this.productModel.difficulty = product.difficulty;
                    this.productModel.spiceLevel = product.spiceLevel;

                    product.ingredients.forEach(({ ingredientId, ingredientName, quantity, measure}, index) => {
                        this.productModel.ingredients[index] = { ingredientId, ingredientName, quantity, measure};
                    });
                    this.ingredientList = this.productModel.ingredients;
                }
            );
    }

    resetFormFields() {
        this.productModel = new ProductModel('', '', null, '', '', null, false, null, null, '', '',
            [{ ingredientId: null, ingredientName: '', quantity: null, measure: ''}]);
    }

    ngOnDestroy() {
        this.urlSubscription.unsubscribe();
        this.subscription.unsubscribe();
    }

    getIngredientList() {
        return this.ingredientList;
    }

    getIngredient(index: number) {
        return this.ingredientList[index];
    }

    addIngredient(ingredient: IngredientModel) {
        this.ingredientList.push(ingredient);
    }

    updateIngredient(index: number, newIngredient: IngredientModel) {
        this.ingredientList[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    deleteIngredient(index: number) {
        this.ingredientList.splice(index, 1);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    onClear() {
        this.ingListForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    BooleanConverter = (value: any) => {
        if (value === null || value === undefined || typeof value === 'boolean')
            return value;

        return value.toString() === 'true';
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
}

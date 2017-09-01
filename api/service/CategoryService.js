'use strict';
const Category = require('../model/category');

/**
 * Create category
 * This endpoint allows to create new category.
 *
 * body Category Category object
 * returns Category
 **/
exports.createCategory = function (body) {
    return new Promise((resolve, reject) => {
        let { category_id, title, image, description } = body;
        let newCategory = new Category({
            "category_id": category_id,
            "title": title,
            "image": image,
            "description": description
        });

        newCategory.save().then(
            categoryDoc => {
                if (Object.keys(categoryDoc).length > 0) {
                    resolve(categoryDoc);
                } else {
                    reject();
                }
                console.log('Saved category', categoryDoc);
            },
            error => { console.log('Unable to save category: ', error); }
        );
    });
}


/**
 *
 * id Long ID of the category to delete
 * no response value expected for this operation
 **/
exports.deleteCategoryById = function(id) {
    return new Promise((resolve, reject) => {
        Category.findOneAndRemove({ category_id: id }).then(
            oneCategoryDoc => {
                oneCategoryDoc = oneCategoryDoc || {};
                if (Object.keys(oneCategoryDoc).length > 0) {
                    resolve(oneCategoryDoc);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove category: ', error); }
        );
    });
}


/**
 *
 * id Long ID of the category to get
 * returns Category
 **/
exports.findCategoryById = function (id) {
    return new Promise((resolve, reject) => {
        Category.findOne({ category_id: id }).then(
            oneCategoryDoc => {
                oneCategoryDoc = oneCategoryDoc || {};
                if (Object.keys(oneCategoryDoc).length > 0) {
                    resolve(oneCategoryDoc);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get category: ', error); }
        );
    });
}


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * isActive Boolean returns active categories (optional)
 * returns List
 **/
exports.getAllCategories = function (offset, limit, isActive) {
    return new Promise((resolve, reject) => {
        Category.find().then(
            categoriesDoc => {
                categoriesDoc = categoriesDoc || [];
                if (Object.keys(categoriesDoc).length > 0) {
                    resolve(categoriesDoc);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get categories: ', error); }
        );
    });
}


/**
 *
 * id Long Id of the Category being updated
 * updatedCategory Category The updated Category
 * no response value expected for this operation
 **/
exports.updateCategoryById = function(id, updatedCategory) {
    return new Promise((resolve, reject) => {
        let { title, image, description } = updatedCategory;

        Category.findOneAndUpdate({ category_id: id }, { title, image, description }).then(
            () => {
                if (Object.keys(updatedCategory).length > 0) {
                    resolve(updatedCategory);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get category: ', error); }
        );
    });
}

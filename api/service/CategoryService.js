'use strict';
const utils = require('../utils/writer.js');
const Category = require('../model/category');

/**
 * Create category
 * This endpoint allows to create new category.
 *
 * body Category Category object
 * returns Category
 **/
exports.createCategory = function ({ category_id, title, image, description }) {
    return new Promise((resolve, reject) => {
        let newCategory = new Category({
            "category_id": category_id,
            "title": title,
            "image": image,
            "description": description
        });

        newCategory.save().then(
            categoryDoc => {
                if (Object.keys(categoryDoc).length > 0) {
                    let {category_id, title, image, description} = categoryDoc;
                    resolve(utils.respondWithCode(201, {category_id, title, image, description}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Category is not created, please try again."}));
                }
                console.log('Saved category', categoryDoc);
            },
            error => { console.log('Unable to save category: ', error); }
        );
    });
};


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
                    let {category_id, title, image, description} = oneCategoryDoc;
                    // if we need to return content we should use code 200
                    resolve(utils.respondWithCode(204, {category_id, title, image, description}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Category is not deleted, please try again."}));
                }
            },
            error => { console.log('Unable to remove category: ', error); }
        );
    });
};


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
                    let {category_id, title, image, description} = oneCategoryDoc;
                    resolve(utils.respondWithCode(200, {category_id, title, image, description}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Category is not found, please try again."}));
                }
            },
            error => { console.log('Unable to get category: ', error); }
        );
    });
};


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
                    categoriesDoc = categoriesDoc.map( ({ category_id, title, image, description }) => {
                        return { category_id, title, image, description };
                    });
                    resolve(utils.respondWithCode(200, categoriesDoc));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Categories are not found, please try again."}));
                }
            },
            error => { console.log('Unable to get categories: ', error); }
        );
    });
};


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
            oneCategory => {
                if (Object.keys(updatedCategory).length > 0 && oneCategory !== null) {
                    let categoryId = oneCategory.category_id;
                    resolve(utils.respondWithCode(200, {categoryId, title, image, description}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "Category is not updated, please try again."}));
                }
            },
            error => { console.log('Unable to get category: ', error); }
        );
    });
};

'use strict';
const Ingredient = require('../model/ingredients');


/**
 * Create category
 * This endpoint allows to create new category.
 *
 * body Category Category object
 * returns Category
 **/
exports.createIngredient = function (body) {
    return new Promise((resolve, reject) => {
        let { ingredient_id, title, description, image, measure, quantity, price, discount } = body;
        let newIngredient = new Ingredient({
            "ingredient_id": ingredient_id,
            "title": title,
            "description": description,
            "image": image,
            "measure": measure,
            "quantity": quantity,
            "price": price,
            "discount": discount
        });

        newIngredient.save().then(
            ingredientDoc => { console.log('Saved ingredient', ingredientDoc); },
            error => { console.log('Unable to save ingredient: ', error); }
        );

        if (Object.keys(newIngredient).length > 0) {
            resolve(newIngredient);
        } else {
            reject();
        }
    });
}

/**
 *
 * id Long ID of the category to delete
 * no response value expected for this operation
 **/
exports.deleteIngredientById = function(id) {
    return new Promise((resolve, reject) => {
        let oneIngredient = {};

        Ingredient.findOneAndRemove({ ingredient_id: id }).then(
            oneIngredientDoc => {
                oneIngredient = oneIngredientDoc;
                if (Object.keys(oneIngredient).length > 0) {
                    resolve(oneIngredient);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove Ingredient: ', error); }
        );
    });
}


/**
 *
 * id Long ID of the category to get
 * returns Category
 **/
exports.findIngredientById = function (id) {
    return new Promise((resolve, reject) => {
        let oneIngredient = {};

        Ingredient.findOne({ ingredient_id: id }).then(
            oneIngredientDoc => {
                oneIngredient = oneIngredientDoc;
                if (Object.keys(oneIngredient).length > 0) {
                    resolve(oneIngredient);
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
exports.getAllIngredients = function (offset, limit, isActive) {
    return new Promise((resolve, reject) => {
        let ingredients = [];
        Ingredient.find().then(
            ingredientsDoc => {
                ingredients = ingredientsDoc;

                if (Object.keys(ingredients).length > 0) {
                    resolve(ingredients);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get ingredients: ', error); }
        );
    });
}


/**
 *
 * id Long Id of the Category being updated
 * updatedCategory Category The updated Category
 * no response value expected for this operation
 **/
exports.updateIngredientById = function(id, updatedIngredient) {
    return new Promise((resolve, reject) => {
        let { title, description, image, measure, quantity, price, discount } = updatedIngredient;

        Ingredient.findOneAndUpdate({ ingredient_id: id }, { title, description, image, measure, quantity, price, discount }).then(
            () => {
                if (Object.keys(updatedIngredient).length > 0) {
                    resolve(updatedIngredient);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get ingredient: ', error); }
        );
    });
};

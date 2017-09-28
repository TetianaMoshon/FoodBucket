'use strict';
const utils = require('../utils/writer.js');
const Ingredient = require('../model/ingredient');
const imageService = require('./common/ImageService');
const debug = require('debug')('foodbucket:ingredientService');

/**
 * Create ingredient
 * This endpoint allows to create new ingredient.
 *
 * body Ingredient Ingredient object
 * returns Ingredient
 **/
exports.createIngredient = function({ingredient_id, image, measure, quantity, price, title}) {
    return new Promise( (resolve, reject) => {
        let newIngredient = new Ingredient ({
            "image": image,
            "measure" : measure,
            "quantity" : quantity,
            "price" : price,
            "title" : title
        });

        newIngredient.save().then(
            ingredientDoc => {
                if (Object.keys(ingredientDoc).length > 0) {
                    let {ingredient_id, title, image, measure, quantity, price} = ingredientDoc;
                    resolve(utils.respondWithCode(201, {ingredient_id, title, image, measure, quantity, price}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Ingredient is not created, please try again."}));
                }
                debug('Saved ingredient: %O', ingredientDoc);
            },
            error => { debug('Unable to save ingredient: %O', error); }
        );
    });
};


/**
 *
 * id Long ID of the ingredient to delete
 * no response value expected for this operation
 **/
exports.deleteIngredientById = function(id) {
    return new Promise( (resolve, reject) => {
        Ingredient.findOneAndRemove({ ingredient_id: id }).then(
            oneIngredientDoc => {
                oneIngredientDoc = oneIngredientDoc || {};
                if (Object.keys(oneIngredientDoc).length > 0) {
                    let {ingredient_id, title, image,  measure, quantity, price} = oneIngredientDoc;
                    resolve(utils.respondWithCode(200, {ingredient_id, title, image,  measure, quantity, price}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Ingredient is not deleted, please try again."}));
                }
            },
            error => { console.log('Unable to remove ingredient'); }
        );

    });
}



/**
 *
 * id Long ID of the ingredient to get
 * returns Ingredient
 **/
exports.findIngredientById = function(id) {
    return new Promise( (resolve, reject) => {
        Ingredient.findOne({ ingredient_id: id }).then(
            oneIngredientDoc => {
                oneIngredientDoc = oneIngredientDoc || {};
                if (Object.keys(oneIngredientDoc).length > 0) {
                    let {ingredient_id, title, image,  measure, quantity, price} = oneIngredientDoc;
                    resolve(utils.respondWithCode(200, {ingredient_id, title, image,  measure, quantity, price}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Ingredient is not found, please try again."}));
                }
            },
            error => { debug('Unable to get ingredient: %O', error); }
        );
    });
};


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * returns List
 **/
exports.getAllIngredients = function(offset,limit, sort, sort_col, search_txt, search_col) {
    return new Promise( (resolve, reject) => {
        let query = {};
        if (search_col && search_txt) {
            if (isNaN(search_txt)) {
                const regex = new RegExp(search_txt, "i");
                query = {[search_col]: regex};
            } else {
                query = {[search_col]: search_txt};
            }

        }
        return Ingredient.count(query).
        then(
            total => {
                Ingredient.find(query).skip(offset).limit(limit).sort({[sort_col]: sort}).then(
                    (ingredientsDoc) => {
                        ingredientsDoc = ingredientsDoc || [];
                        if (Object.keys(ingredientsDoc).length > 0) {
                            ingredientsDoc = ingredientsDoc.map( ({ ingredient_id, title, image,  measure, quantity, price}) => {
                                return { ingredient_id, title, image,  measure, quantity, price };
                            });
                            resolve({total: total, body: utils.respondWithCode(200, ingredientsDoc)});
                        } else {
                            resolve(utils.respondWithCode(204));
                        }
                    },
                    error => { debug('Unable to get ingredients: %O', error); }
                );
            }
        );
    });
};



/**
 *
 * id Long Id of the Ingredient being updated
 * updatedIngredient Ingredient The updated Ingredient
 * no response value expected for this operation
 **/
exports.updateIngredientById = function(id,updatedIngredient) {
    return new Promise((resolve, reject) => {
        let { title, image, measure, quantity, price } = updatedIngredient;

        Ingredient.findOneAndUpdate({ ingredient_id: id }, { title, image,  measure, quantity, price }).then(
            oneIngredient => {
                if (Object.keys(updatedIngredient).length > 0 && oneIngredient !== null) {
                    let ingredient_id = oneIngredient.ingredient_id;
                    resolve(utils.respondWithCode(200, {ingredient_id, title, image,  measure, quantity, price}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 400, "message": "Ingredient is not updated, please try again."}));
                }
            },
            error => { debug('Unable to get ingredient: %O', error); }
        );
    });
};


/**
 *
 * id Long ID of the ingredient image upload for
 * file File  (optional)
 * additionalMetadata String Additional data to pass to server (optional)
 * no response value expected for this operation
 **/
exports.postIngredientImageById = function(id, file, additionalMetadata) {
    return new Promise((resolve, reject) => {
        let entityName = 'ingredient';
        Ingredient.findOne({ ingredient_id: id }).then(ingredient => {
            return imageService.uploadImage(ingredient.ingredient_id, entityName, file);
        }).then(pathToStoreInDB => {
            return Ingredient.findOneAndUpdate({ ingredient_id: id }, { $set: { image: pathToStoreInDB } }, { new: true }).then(
                oneIngredient => {
                    if (pathToStoreInDB !== undefined && pathToStoreInDB !== null && oneIngredient !== null) {
                        let {ingredient_id, title, image,  measure, quantity, price} = oneIngredient;
                        resolve(utils.respondWithCode(200, {ingredient_id, title, image,  measure, quantity, price}));
                    } else {
                        reject(utils.respondWithCode(400, {"code": 404, "message": "Ingredient is not updated, please try again."}));
                    }
                },
                error => { debug('Unable to get ingredient: %O', error); }
            );
        }).catch(e => {
            debug(e);
        });
    });
}


/**
 *
 * id Long ID of the ingredient image upload for
 * file File  (optional)
 * additionalMetadata String Additional data to pass to server (optional)
 * no response value expected for this operation
 **/
exports.putIngredientImageById = function(id,file,additionalMetadata) {
    return new Promise((resolve, reject) => {
        let entityName = 'ingredient';
        Ingredient.findOne({ ingredient_id: id }).then(ingredient => {
            return imageService.uploadImage(ingredient.ingredient_id, entityName, file);
        }).then(pathToStoreInDB => {
            return Ingredient.findOneAndUpdate({ ingredient_id: id }, { $set: { image: pathToStoreInDB } }, { new: true }).then(
                oneIngredient => {
                    if (pathToStoreInDB !== undefined && pathToStoreInDB !== null && oneIngredient !== null) {
                        let {ingredient_id, title, image,  measure, quantity, pice} = oneIngredient;
                        resolve(utils.respondWithCode(200, {ingredient_id, title, image,  measure, quantity, price}));
                    } else {
                        reject(utils.respondWithCode(400, {"code": 404, "message": "Ingredient is not updated, please try again."}));
                    }
                },
                error => { debug('Ingredient to get category: %O', error); }
            );
        }).catch(e => {
            debug(e);
        });
    });
}




'use strict';
const utils = require('../utils/writer.js');
const Product = require('../model/product');
const Ingredient = require('../service/IngredientService');
const Ingred = require('../model/ingredients');
exports.createProduct = function ({ productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients}) {

    let ingredientPromise = new Promise((resolve, reject) =>{
        let newIngredients =[];
        ingredients.forEach(function (ingredient) {
            Ingred
                .findOne({ ingredient_id: ingredient.ingredientId })
                .then(
                    oneIngredient =>{
                        newIngredients.push(oneIngredient);
                        return newIngredients;
                    }

        ).then( newIngredients => {resolve(newIngredients);});
    });
    });

    ingredientPromise.then(newIngredients =>{console.log('WOW_1'+newIngredients.length);})


    return new Promise((resolve, reject) => {
///_______________________________________________________________________
            Ingredient.findIngredientById(ingredients[0].ingredientId)
                .then(
                    oneIngredientDoc =>{
                        let doc = oneIngredientDoc;
                        console.log("1 "+doc);
                        console.log("2 "+ingredients[0].ingredientId);
                        return doc;
                    },
                    error => {return error}
                ).then( doc => {ingredients[0].ingredientName = doc.title;console.log("3 "+doc.title);return ingredients})
                .then(
                     ingredients => {let newProduct = new Product({
                        productId,
                        title,
                        description,
                        image,
                        price,
                        category,
                        status,
                        recommended,
                        discount,
                        promotions,
                        caloricity,
                        servingSize,
                        difficulty,
                        spiceLevel,
                        ingredients
        });return newProduct;}).then(
                    newProduct =>
                    newProduct.save()
                        .then(productDoc => {
                          if (Object.keys(newProduct).length > 0) {
                              let { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = productDoc;
                              resolve(utils.respondWithCode(201, { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
                          } else {
                              reject(utils.respondWithCode(404, {"code": 404, "message": "Product is not created, please try again."}));
                          }
                          console.log('Saved product', productDoc);
                      },
                      error => { console.log('Unable to save product', error); }
                  ))})
}

exports.deleteProductById = function(id) {
    return new Promise((resolve, reject) => {
       Product.findOneAndRemove({ productId: id }).then(
            oneProductDoc => {
                oneProductDoc = oneProductDoc || {};
                if (Object.keys(oneProductDoc).length > 0) {
                    let { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProductDoc;
                    resolve(utils.respondWithCode(200, { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Product is not deleted, please try again."}));
                }
            },
            error => { console.log('Unable to remove product', error); }
        );
    });
}

exports.findProductById = function(id) {
    return new Promise((resolve, reject) => {
        Product.findOne({ productId: id }).then(
            oneProductDoc => {
                oneProductDoc = oneProductDoc || {};
                if (Object.keys(oneProductDoc).length > 0) {
                    let { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProductDoc;
                    resolve(utils.respondWithCode(200, { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Product is not found, please try again."}));
                }
            },
            error => { console.log('Unable to get product', error); }
        );
    });
}

exports.getAllProducts = function(offset,limit,isActive) {
    return new Promise((resolve, reject) => {
        Product.find().then(
            productsDoc => {
                productsDoc = productsDoc || {};
                if (Object.keys(productsDoc).length > 0) {
                    productsDoc = productsDoc.map(({productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients}) => {
                        return {
                            productId,
                            title,
                            description,
                            image,
                            price,
                            category,
                            caloricity,
                            servingSize,
                            difficulty,
                            spiceLevel,
                            recommended,
                            discount,
                            promotions,
                            status,
                            ingredients
                        };
                    });
                    resolve(utils.respondWithCode(200, productsDoc));
                }
                else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Products are not found, please try again."}));
                }
            },
            error => { console.log('Unable to get products', error); }
        );
    });
}

exports.updateProductById = function(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        let { title, description, image, price, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients } = updatedProduct;

        Product.findOneAndUpdate({ productId: id },
            {
                title,
                description,
                image,
                price,
                category,
                status,
                recommended,
                discount,
                promotions,
                caloricity,
                servingSize,
                difficulty,
                spiceLevel,
                ingredients
            }).then(
            oneProduct => {
                if (Object.keys(updatedProduct).length > 0 && oneProduct !== null) {
                    let productId = Product.productId;
                    resolve(utils.respondWithCode(200, { title, description, image, price, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients }));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "Product is not updated, please try again."}));
                }
            },
            error => { console.log('Unable to get product: ', error); }
        );
    });
}

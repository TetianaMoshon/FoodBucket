'use strict';
const utils = require('../utils/writer.js');
const Product = require('../model/product');
const Ingredient = require('../service/IngredientService');
const Ingred = require('../model/ingredients');
const imageService = require('./common/ImageService');

exports.createProduct = function ({ productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients}) {
    return new Promise((resolve, reject) => {
        let newProduct = new Product({
            productId,
            title,
            description,
            price,
            image,
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
        });
        newProduct.save()
            .then(productDoc => {
                    if (Object.keys(newProduct).length > 0) {
                        let { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = productDoc;
                        resolve(utils.respondWithCode(201, { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
                    } else {
                        reject(utils.respondWithCode(404, {"code": 404, "message": "Product is not created, please try again."}));
                    }
                    console.log('Saved product', productDoc);
                },
                error => { console.log('Unable to save product', error); }
            );
    });
};

exports.deleteProductById = function(id) {
    return new Promise((resolve, reject) => {
        Product.findOneAndRemove({ productId: id }).then(
            oneProductDoc => {
                oneProductDoc = oneProductDoc || {};
                if (Object.keys(oneProductDoc).length > 0) {
                    let { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProductDoc;
                    resolve(utils.respondWithCode(200, { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
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
                    let { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProductDoc;
                    resolve(utils.respondWithCode(200, { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients }));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Product is not found, please try again."}));
                }
            },
            error => { console.log('Unable to get product', error); }
        );
    });
}

exports.getAllProducts = function(offset,limit, sort, sort_col, search_txt, search_col) {
    return new Promise((resolve, reject) => {
        let query = {};
        if (search_col && search_txt) {
            if (isNaN(search_txt)) {
                const regex = new RegExp(search_txt, "i");
                query = {[search_col]: regex};
            } else {
                query = {[search_col]: search_txt};
            }
        }

        return Product.count().then(
            total => {
                Product.find(query).skip(offset).limit(limit).sort({[sort_col]: sort}).then(
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
                            resolve({total: total, body: utils.respondWithCode(200, productsDoc)});
                        }
                        else {
                            reject(utils.respondWithCode(204));
                        }
                    },
                    error => { console.log('Unable to get products', error); }
                );
            }
        )

    });
}

exports.updateProductById = function(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        let { title, description, price, image, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients } = updatedProduct;

        Product.findOneAndUpdate({ productId: id },
            {
                title,
                description,
                price,
                category,
                image,
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
                    resolve(utils.respondWithCode(200, { title, description, price, image, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients }));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "Product is not updated, please try again."}));
                }
            },
            error => { console.log('Unable to get product: ', error); }
        );
    });
}




/**
 *
 * id Long ID of the product image upload for
 * file File  (optional)
 * additionalMetadata String Additional data to pass to server (optional)
 * no response value expected for this operation
 **/
exports.postProductImageById = function(id,file,additionalMetadata) {
    return new Promise((resolve, reject) => {
        let entityName = 'product';
        Product.findOne({ productId: id }).then(ingredient => {
            return imageService.uploadImage(ingredient.productId, entityName, file);
        }).then(pathToStoreInDB => {
            return Product.findOneAndUpdate({ productId: id }, { $set: { image: pathToStoreInDB } }, { new: true }).then(
                oneProduct => {
                    if (pathToStoreInDB !== undefined && pathToStoreInDB !== null && oneProduct !== null) {
                        let { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProduct;
                        resolve(utils.respondWithCode(200, { title, description, price, image, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients }));
                    } else {
                        reject(utils.respondWithCode(400, {"code": 404, "message": "Product is not updated, please try again."}));
                    }
                },
                error => { debug('Unable to get Product: %O', error); }
            );
        }).catch(e => {
            debug(e);
        });
    });
}


/**
 *
 * id Long ID of the product image upload for
 * file File  (optional)
 * additionalMetadata String Additional data to pass to server (optional)
 * no response value expected for this operation
 **/
exports.putProductImageById = function(id,file,additionalMetadata) {
    return new Promise((resolve, reject) => {
        let entityName = 'product';
        Product.findOne({ productId: id }).then(product => {
            return imageService.uploadImage(product.productId, entityName, file);
        }).then(pathToStoreInDB => {
            return Product.findOneAndUpdate({ productId: id }, { $set: { image: pathToStoreInDB } }, { new: true }).then(
                oneProduct => {
                    if (pathToStoreInDB !== undefined && pathToStoreInDB !== null && oneProduct !== null) {
                        let { productId, title, description, price, image, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = oneProduct;
                        resolve(utils.respondWithCode(200, { title, description, price, image, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel, ingredients }));
                    } else {
                        reject(utils.respondWithCode(400, {"code": 404, "message": "Product is not updated, please try again."}));
                    }
                },
                error => { debug('Product to get category: %O', error); }
            );
        }).catch(e => {
            debug(e);
        });
    });
}





'use strict';
const utils = require('../utils/writer.js');
const Product = require('../model/product');
const Ingredient = require('../model/ingredients');

exports.createProduct = function (body) {
    return new Promise((resolve, reject) => {
        let { productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients } = body;

        ingredients.forEach(function () {
            console.log(ingredients[i])
        })

        let newProduct = new Product({
            "productId": productId,
            "title": title,
            "description": description,
            "image": image,
            "price": price,
            "category": category,
            "status": status,
            "recommended": recommended,
            "discount": discount,
            "promotions": promotions,
            "caloricity": caloricity,
            "servingSize": servingSize,
            "difficulty": difficulty,
            "spiceLevel": spiceLevel,
            "ingredients": ingredients
        });

        newProduct.save().then(
            productDoc => { console.log('Saved product', productDoc); },
            error => { console.log('Unable to save product', error); }
        );

        if (Object.keys(newProduct).length > 0) {
            resolve(newProduct);
        } else {
            reject();
        }
    });
}


exports.deleteProductById = function(id) {
    return new Promise((resolve, reject) => {
        let oneProduct = {};

        Product.findOneAndRemove({ productId: id }).then(
            oneProductDoc => {
                oneProduct = oneProductDoc;
                if (Object.keys(oneProduct).length > 0) {
                    resolve(oneProduct);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove product', error); }
        );
    });
}

exports.findProductById = function(id) {
    return new Promise((resolve, reject) => {
        let oneProduct = {};

        Product.findOne({ productId: id }).then(
            oneProductDoc => {
                oneProduct = oneProductDoc;
                if (Object.keys(oneProduct).length > 0) {
                    resolve(oneProduct);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get product', error); }
        );
    });
}

exports.getAllProducts = function(offset,limit,isActive) {
    return new Promise((resolve, reject) => {
        let products = [];
        Product.find().then(
            productsDoc => {
                products = productsDoc;

                if (Object.keys(products).length > 0) {
                    resolve(products);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get products', error); }
        );
    });
}

exports.updateProductById = function(id, updatedProduct) {
    return new Promise((resolve, reject) => {
        let { title, description, image, price, category, status, recommended, discount, promotions, caloricity, servingSize, difficulty, spiceLevel } = updatedProduct;

        Product.findOneAndUpdate({ productId: id },
            {
                "title": title,
                "description": description,
                "image": image,
                "price": price,
                "category": category,
                "status": status,
                "recommended": recommended,
                "discount": discount,
                "promotions": promotions,
                "caloricity": caloricity,
                "servingSize": servingSize,
                "difficulty": difficulty,
                "spiceLevel": spiceLevel
            }).then(
            () => {
                if (Object.keys(updatedProduct).length > 0) {
                    resolve(updatedProduct);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get product: ', error); }
        );
    });
}

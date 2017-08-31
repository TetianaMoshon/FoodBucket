'use strict';

const Product = require('../model/product');

/**
 * Create product
 * This endpoint allows to create new product.
 *
 * body Product Product object
 * returns Product
 **/
exports.createProduct = function ({productId, title, description, image, price}) {
    return new Promise(function (resolve, reject) {
        let newProduct = {};
        newProduct['application/json'] = new Product({
            "productId": productId,
            "title": title,
            "description": description,
            "image": image,
            "price": price
            // "calories": calories,
            // "time": time,
            // "steps": steps,
            // "difficulty": difficulty,
            // "weight": weight
        });

        newProduct['application/json'].save().then(
            productDoc => { console.log('Saved product', productDoc); },
            error => { console.log('Unable to save product'); }
        );

        if (Object.keys(newProduct).length > 0) {
            resolve(newProduct[Object.keys(newProduct)[0]]);
        } else {
            reject();
        }
    });
}

exports.deleteProductById = function(id) {
    return new Promise(function (resolve, reject) {
        let oneProduct = {};

        Product.findOneAndRemove({ product_id: id }).then(
            oneProductDoc => {
                oneProduct['application/json'] = oneProductDoc;
                if (Object.keys(oneProduct).length > 0) {
                    resolve(oneProduct[Object.keys(oneProduct)[0]]);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove product'); }
        );
    });
}

/**
 *
 * id Long ID of the product to get
 * returns Product
 **/
exports.findProductById = function(id) {
    return new Promise(function (resolve, reject) {
        let oneProduct = {};

        Product.findOne({ product_id: id }).then(
            oneProductDoc => {
                oneProduct['application/json'] = oneProductDoc;
                if (Object.keys(oneProduct).length > 0) {
                    resolve(oneProduct[Object.keys(oneProduct)[0]]);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get product'); }
        );
    });
}


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * isActive Boolean returns active products (optional)
 * returns List
 **/
exports.getAllProducts = function(offset,limit,isActive) {
    return new Promise(function (resolve, reject) {
        let products = [];
        Product.find().then(
            productsDoc => {
                products['application/json'] = productsDoc;

                if (Object.keys(products).length > 0) {
                    resolve(products[Object.keys(products)[0]]);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to get products'); }
        );
    });
}


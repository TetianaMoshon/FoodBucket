'use strict';

const Product = require('../model/product');

exports.createProduct = function ({productId, title, description, image, price}) {
    return new Promise((resolve, reject) => {
        let newProduct = {};
        newProduct = new Product({
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
        let { title, description, image, price } = updatedProduct;

        Product.findOneAndUpdate({ productId: id }, { title, description, image, price }).then(
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

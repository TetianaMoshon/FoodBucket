'use strict';
const Cart = require('../model/cart');

/**
 * Create cart for user using user's id
 * This endpoint allows to create new cart for user using user's id.
 *
 * id Long ID of the user to get content of the cart
 * body Cart Cart object
 * returns Cart
 **/
exports.createCartForUserById = function(id,body) {
    return new Promise(function(resolve, reject) {
        let { orderedProducts, totalPriceOfAllDishes } = body;

        let newCart = new Cart({
            "userId": id,
            "orderedProducts": orderedProducts,
            "totalPriceOfAllDishes": totalPriceOfAllDishes
        });

        newCart.save()
            .then(
             cartDoc => { console.log('Saved cart content', cartDoc); },
             error => { console.log('Unable to save cart content: ', error); });

        if (Object.keys(newCart).length > 0) {
            resolve(newCart);
        } else {
            reject();
        }

    });
}


/**
 *
 * id Long ID of the user to delete content of the cart
 * no response value expected for this operation
 **/
exports.deleteCartContentById = function(id) {
    return new Promise(function(resolve, reject) {
        let oneCart = {};

        Cart.findOneAndRemove({ userId: id }).then(
            oneCartDoc => {
            oneCart = oneCartDoc;
        if (Object.keys(oneCart).length > 0) {
            resolve(oneCart);
        } else {
            reject();
        }
    },
        error => { console.log('Unable to remove cart content of a particular user ', error); }
        );
    });
}


/**
 *
 * id Long ID of the user to get content of the cart
 * returns Cart
 **/
exports.findCartContentById = function(id) {
    return new Promise(function(resolve, reject) {
        var oneCart = {};

        Cart.findOne({ userId: id }).then(
            oneCartDoc => {
            oneCart = oneCartDoc;
        if (Object.keys(oneCart).length > 0) {
            resolve(oneCart);
        } else {
            reject();
        }
    },
        error => { console.log('Unable to get cart content of a particular user ', error); }
        );
    });
}


/**
 *
 * id Long content of the user's cart is being updated
 * updated_cartContent Cart The updated cartContent
 * no response value expected for this operation
 **/
exports.updateCartContentById = function(id,updatedcartContent) {
    return new Promise(function(resolve, reject) {
        let {orderedProducts, totalPriceOfAllDishes} = updatedcartContent;

        let oneCart = Cart.findOneAndUpdate({ userId: id },
            {
                ordered_products: orderedProducts,
                totalPriceOfAllDishes: totalPriceOfAllDishes
            }
        ).then(
                () => {
        if (Object.keys(oneCart).length > 0) {
            resolve(oneCart);
        } else {
            reject();
        }
    },
        error => { console.log('Unable to update cart content of a particular user ', error); }
        );
    });
}


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
        const { orderedProducts, totalPriceOfAllDishes } = body;

       new Cart({
            userId: id,
            orderedProducts,
            totalPriceOfAllDishes
        })
           .save()
           .then(
             cartDoc => { console.log('Saved cart content', cartDoc);
            if (Object.keys(cartDoc).length > 0) {
                resolve(cartDoc);
            } else {
                reject(utils.respondWithCode(404, {"code": 404, "message": "Cart is not created, please try again."}));
            }
             },
               error => { console.log('Unable to save cart content: ', error); }
      );

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
            reject(utils.respondWithCode(404, {"code": 404, "message": "Cart is not deleted, please try again."}));
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
            reject(utils.respondWithCode(404, {"code": 404, "message": "Cart is not found, please try again."}));
        }
    },
            error => { console.log('Unable to get cart content of a particular user ', error); }
        );
    });
}


/**
 *
 * id Long content of the user's cart is being updated
 * updatedcartContent Cart The updated cartContent
 * no response value expected for this operation
 **/
exports.updateCartContentById = function(id,updatedcartContent) {
    return new Promise(function(resolve, reject) {
        let {orderedProducts, totalPriceOfAllDishes} = updatedcartContent;

        let oneCart = Cart.findOneAndUpdate({ userId: id },
            {
                orderedProducts,
                totalPriceOfAllDishes
            }
        ).then(
                () => {
        if (Object.keys(updatedcartContent).length > 0) {
            resolve(updatedcartContent);
        } else {
            reject(utils.respondWithCode(400, {"code": 404, "message": "Cart is not updated, please try again."}));
        }
    },
            error => { console.log('Unable to update cart content of a particular user', error); }
        );
    });
}


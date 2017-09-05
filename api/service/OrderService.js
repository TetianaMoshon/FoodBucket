'use strict';
const Order = require('../model/order');
const utils = require('../utils/writer.js');

/**
 *
 * id Long ID of the order to get
 * returns Order
 **/
exports.findOrderById = function(id) {
    return new Promise(function(resolve, reject) {
        Order.findOne({orderId: id}).then(
            (oneOrderDoc) =>{
                oneOrderDoc = oneOrderDoc || {};
                if (Object.keys(oneOrderDoc).length > 0) {
                    let { orderId,username, city, address, products,price,status } = oneOrderDoc;
                    resolve(utils.respondWithCode(200, { orderId,username, city, address, products,price,status }));
                }
                else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Order is not found, please try again."}));
                }
            },
            (error)=> {console.log('Unable to find order. View error:' + error.toString()); reject();}
        );
    });
};


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * returns List
 **/
exports.getAllOrders = function (offset, limit) {
    return new Promise(function (resolve, reject) {

        Order.find().then(
            (ordersDoc) => {
                ordersDoc = ordersDoc || [];
                if (Object.keys(ordersDoc).length > 0) {
                    ordersDoc = ordersDoc.map( ({ orderId,username, city, address, products,price,status }) => {
                        return { orderId,username, city, address, products,price,status };
                    });
                    resolve(utils.respondWithCode(200, ordersDoc));
                }
                else {
                reject(utils.respondWithCode(404, {"code": 404, "message": "Categories are not found, please try again."}));
                }
            },
            (error) => {console.log('Unable to find order. View error:' + error.toString());}
        );
    })
};
/**
 * Put an order
 * This endpoint allows to make an order.
 *
 * body Order Order body
 * returns Order
 **/
exports.putOrder = function({ orderId,username, city, address, products,price,status }) {
    return new Promise(function(resolve, reject) {
        let newOrder = new Order({
            "orderId": orderId,
            "username":username,
            "city": city,
            "address": address,
            "products": products,
            "price": price,
            "status": status
        });
        newOrder.save().then(
            // (orderDoc) => { console.log('Saved order', orderDoc); },
            // (error) => { console.log('Unable to save category', error); }
        orderDoc => {
            if (Object.keys(orderDoc).length > 0) {
                let { orderId,username, city, address, products,price,status,date } = orderDoc;
                resolve(utils.respondWithCode(201, { orderId,username, city, address, products,price,status,date }));
            } else {
                reject(utils.respondWithCode(404, {"code": 404, "message": "Order is not created, please try again."}));
            }
            //console.log('Saved category', orderDoc);
        }

    );
        //
        // if (Object.keys(newOrder).length > 0) {
        //     let {username, city, address, products, price, status,date} = newOrder;
        //     let responseOrder = {
        //         "username":username,
        //         "city": city,
        //         "address": address,
        //         "products": products,
        //         "price": price,
        //         "status": status,
        //         "date": date
        //     };
        //     resolve(responseOrder);
        // } else {
        //     reject();
        // }
    });
};
exports.deleteOrderById = function(id) {
    return new Promise((resolve, reject) => {

        Order.findOneAndRemove({ orderId: id }).then(
            oneOrderDoc => {
                oneOrderDoc = oneOrderDoc || {};
                if (Object.keys(oneOrderDoc).length > 0) {
                    let { orderId,username, city, address, products,price,status,date } = oneOrderDoc;
                    resolve(utils.respondWithCode(201, { orderId,username, city, address, products,price,status,date }));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Order is not deleted, please try again."}));

                }
            },
            error => { console.log('Unable to remove order: ', error); }
        );
    });
};

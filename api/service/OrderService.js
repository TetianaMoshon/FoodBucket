'use strict';
const Order = require('../model/order');
const utils = require('../utils/writer.js');
const debug = require('debug')('foodbucket:orderService');
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
            (error)=> {debug('Unable to find order. View error:' + error.toString()); reject();}
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
                    ordersDoc = ordersDoc.map( ({ date,orderId,username, city, address, products,price,status }) => {
                        let formattedDate = new Date(date).getDate()+'/'+ (new Date(date).getMonth()+1)+'/'+new Date(date).getFullYear();
                        date = formattedDate;
                        return { date,orderId,username, city, address, products,price,status };
                    });
                    resolve(utils.respondWithCode(200, ordersDoc));
                }
                else {
                reject(utils.respondWithCode(404, {"code": 404, "message": "Orders are not found, please try again."}));
                }
            },
            (error) => {debug('Unable to find order. View error:' + error.toString());}
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
        orderDoc => {
            if (Object.keys(orderDoc).length > 0) {
                let { orderId,username, city, address, products,price,status } = orderDoc;
                let date =getFormattedDate(orderDoc.date);
                resolve(utils.respondWithCode(201, { orderId,username, city, address, products,price,status,date }));
            } else {
                reject(utils.respondWithCode(404, {"code": 404, "message": "Order is not created, please try again."}));
            }
        }

    );
    });
};
exports.deleteOrderById = function(id) {
    return new Promise((resolve, reject) => {

        Order.findOneAndRemove({ orderId: id }).then(
            oneOrderDoc => {
                oneOrderDoc = oneOrderDoc || {};
                if (Object.keys(oneOrderDoc).length > 0) {
                    let { orderId,username, city, address, products,price,status} = oneOrderDoc;
                    let date =getFormattedDate(oneOrderDoc.date);
                    resolve(utils.respondWithCode(201, { orderId,username, city, address, products,price,status,date }));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Order is not deleted, please try again."}));

                }
            },
            error => { debug('Unable to remove order: ', error); }
        );
    });
};

function getFormattedDate(date) {
    return new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear();
}

exports.updateOrderById = function(updatedOrder,id ) {
    return new Promise((resolve, reject) => {
        let {username, city, address, products,price,status,} = updatedOrder;
        Order.findOneAndUpdate({ orderId: id }, {status}).then(
            oneOrder => {
                if (Object.keys(updatedOrder).length > 0 && oneOrder !== null) {
                    let date =getFormattedDate(oneOrder.date);
                    resolve(utils.respondWithCode(200, {username, city, address, products,price,status,date}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "Order is not updated, please try again."}));
                }
            },
            error => { debug('Unable to get order: %O', error); }
        );
    });
};

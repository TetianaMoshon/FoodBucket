'use strict';
const Order = require('../model/order');
const utils = require('../utils/writer.js');
const debug = require('debug')('foodbucket:orderService');
const Product = require('../model/product');
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
                    Product.find({
                        'productId': { $in: oneOrderDoc.products}
                    }).then(products => {
                        products = products.map(({ title }) => {
                            return title ;
                        });
                        let { orderId,username, city, phone,address,price,status,quantity } = oneOrderDoc;
                        resolve(utils.respondWithCode(200, { orderId,username, phone,city, address, products,price,status,quantity }));
                    });
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
exports.getAllOrders = function (offset, limit, sort, sort_col, search_txt, search_col) {
    return new Promise(function (resolve, reject) {
        let query = {};
        if (search_col && search_txt) {
            if (isNaN(search_txt)) {
                const regex = new RegExp(search_txt, "i");
                query = {[search_col]: regex};
            } else {
                 query = {[search_col]: search_txt};
            }

        }
        return Order.count().
            then(
                total => {
                    Order.find(query).skip(offset).limit(limit).sort({[sort_col]: sort}).then(
                        (ordersDoc) => {
                            ordersDoc = ordersDoc || [];
                            if (Object.keys(ordersDoc).length > 0) {
                                ordersDoc = ordersDoc.map( ({ date,orderId,username, phone,city, address, products,price,status,quantity }) => {
                                    date = new Date(date).getDate()+'/'+ (new Date(date).getMonth()+1)+'/'+new Date(date).getFullYear();
                                    return { date,orderId,username, city,phone, address, products,price,status,quantity };
                                });
                                resolve({total: total, body: utils.respondWithCode(200, ordersDoc)});
                            }
                            else {
                                reject(utils.respondWithCode(204));
                            }
                        },
                        (error) => {debug('Unable to find order. View error:' + error.toString());}
                    );
                }
        )

    })
};
/**
 * Put an order
 * This endpoint allows to make an order.
 *
 * body Order Order body
 * returns Order
 **/
exports.putOrder = function({ orderId,username, phone,city, address, products,price,status,quantity }) {
    return new Promise(function(resolve, reject) {
        let newOrder = new Order({
            "orderId": orderId,
            "username":username,
            "city": city,
            "address": address,
            "products": products,
            "phone":phone,
            "price": price,
            "status": status,
            "quantity": quantity
        });
        newOrder.save().then(
        orderDoc => {
            if (Object.keys(orderDoc).length > 0) {
                let { orderId,username, city,phone, address, products,price,status,quantity } = orderDoc;
                let date =getFormattedDate(orderDoc.date);
                resolve(utils.respondWithCode(201, { orderId,username, city,phone, address, products,price,status,date,quantity }));
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
        let {status} = updatedOrder;
        Order.findOneAndUpdate({ orderId: id }, {status}).then(
            oneOrder => {
                if (Object.keys(updatedOrder).length > 0 && oneOrder !== null) {
                    let date =getFormattedDate(oneOrder.date);
                    let {username, city, address, products,price} = oneOrder;
                    resolve(utils.respondWithCode(200, {username, city, address, products,price,status,date}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "Order is not updated, please try again."}));
                }
            },
            error => { debug('Unable to get order: %O', error); }
        );
    });
};

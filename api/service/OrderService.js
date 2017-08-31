'use strict';
const Order = require('../model/order');

/**
 *
 * id Long ID of the order to get
 * returns Order
 **/
exports.findOrderById = function(id) {
    return new Promise(function(resolve, reject) {
        let oneOrder = {};
        Order.findOne({orderId: id}).then(
            (oneOrderDoc) =>{
                oneOrder = oneOrderDoc;
                if (Object.keys(oneOrder).length > 0){
                    resolve(oneOrder)
                }
                else {
                    reject();
                }
            },
            (error)=> {console.log('Unable to find order. View error:' + error.toString());}
        );
//     examples['application/json'] = {
//   "address" : "address",
//   "city" : "city",
//   "price" : 0,
//   "username" : "username",
//   "status" : "status",
//   "products" : [ {
//     "image" : "image",
//     "price" : 6,
//     "description" : "description",
//     "ingredients" : [ {
//       "image" : "image",
//       "ingredient_id" : 1,
//       "description" : "description",
//       "title" : "title"
//     }, {
//       "image" : "image",
//       "ingredient_id" : 1,
//       "description" : "description",
//       "title" : "title"
//     } ],
//     "id" : 1,
//     "title" : "title",
//     "productInfo" : [ {
//       "product_info_id" : 5,
//       "calories" : 5
//     }, {
//       "product_info_id" : 5,
//       "calories" : 5
//     } ]
//   }, {
//     "image" : "image",
//     "price" : 6,
//     "description" : "description",
//     "ingredients" : [ {
//       "image" : "image",
//       "ingredient_id" : 1,
//       "description" : "description",
//       "title" : "title"
//     }, {
//       "image" : "image",
//       "ingredient_id" : 1,
//       "description" : "description",
//       "title" : "title"
//     } ],
//     "id" : 1,
//     "title" : "title",
//     "productInfo" : [ {
//       "product_info_id" : 5,
//       "calories" : 5
//     }, {
//       "product_info_id" : 5,
//       "calories" : 5
//     } ]
//   } ]
// };
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
        let orders = [];
        Order.find().then(
            (ordersDoc) => {
                orders = ordersDoc;

                if (Object.keys(orders).length > 0) {
                    resolve(orders);
                } else {
                    reject();
                }
            },
            (error) => {console.log('Unable to find order. View error:' + error.toString());}
        );
    });
};
/**
 * Put an order
 * This endpoint allows to make an order.
 *
 * body Order Order body
 * returns Order
 **/
exports.putOrder = function(body) {
    return new Promise(function(resolve, reject) {
        let {username, city, address, products, price, status} = body;
        let newOrder = new Order({
            "username":username,
            "city": city,
            "address": address,
            "products": products,
            "price": price,
            "status": status
        });
        newOrder.save().then(
            (orderDoc) => { console.log('Saved order', orderDoc); },
            (error) => { console.log('Unable to save category', error); }
        );

        if (Object.keys(newOrder).length > 0) {
            let {username, city, address, products, price, status,date} = newOrder;
            let responseOrder = {
                "username":username,
                "city": city,
                "address": address,
                "products": products,
                "price": price,
                "status": status,
                "date": date
            };
            resolve(responseOrder);
        } else {
            reject();
        }
    });
};
exports.deleteOrderById = function(id) {
    return new Promise((resolve, reject) => {
        let oneOrder = {};

        Order.findOneAndRemove({ order_id: id }).then(
            oneOrderDoc => {
                oneOrder = oneOrderDoc;
                if (Object.keys(oneOrder).length > 0) {
                    resolve(oneOrder);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove order: ', error); }
        );
    });
};

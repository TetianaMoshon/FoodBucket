'use strict';
const Order = require('../model/order');
const User = require('../model/user');
const utils = require('../utils/writer.js');
/**
 *
 * returns List
 **/
exports.getOrderStatistics = function() {
    return new Promise(function (resolve, reject) {
    Order.count().then((totalOrders) =>{
        console.log(totalOrders);
        resolve({totalOrders});
        }
    )
});
};


/**
 *
 * returns List
 **/
exports.getUsersStatistics = function() {
    return new Promise(function (resolve, reject) {
    User.count().then(totalUsers => {
        console.log(totalUsers);
        resolve({totalUsers});
    });
    });
};


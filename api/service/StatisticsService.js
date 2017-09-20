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
            resolve({totalUsers});
        });
    });
};



exports.getCompletedOrdersStatistics = function() {
  return new Promise(function(resolve, reject) {
      Order.count({status:'Delivered'}).then(completedOrders => {
          resolve({completedOrders});
      });
  });
};

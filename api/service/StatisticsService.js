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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "totalUsers" : 1,
  "totalMoney" : 6,
  "completedOrders" : 5,
  "totalOrders" : 0
}, {
  "totalUsers" : 1,
  "totalMoney" : 6,
  "completedOrders" : 5,
  "totalOrders" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


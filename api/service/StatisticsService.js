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
        return Order.count()
    }).then((totalOrders) =>{
         return Order.count({status:'Delivered'}).then((deliveredOrders)=>{
             return {totalOrders, deliveredOrders}
         })
        }
    ).then(twoFieldsObject=>{
        return User.count().then(users=>{
            return twoFieldsObject.totalUsers = users;
        });
    }).then(money=>{
        return Order.aggregate([])
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


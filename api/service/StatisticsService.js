'use strict';
const Order = require('../model/order');
const User = require('../model/user');
const utils = require('../utils/writer.js');
const Product = require('../model/product');
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

exports.getCategoriesStatistics = function(categoryQuery) {
    return new Promise(function (resolve, reject) {
        Product.count({category: categoryQuery}).then((queryProducts) =>{
                resolve({queryProducts});
            }
        )}
    )};

exports.getNonpromotionalProducts = function() {
    return new Promise(function(resolve, reject) {
        Product.count({promotions:false}).then(nonpromotionalProducts => {
            resolve({nonpromotionalProducts});
        });
    });
};
exports.getPromotionProductsCount = function() {
    return new Promise(function(resolve, reject) {
        Product.count({promotions:true}).then(promotionalProducts => {
            resolve({promotionalProducts});
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

exports.getRevenue = function() {
    let revenue;
    return new Promise(function(resolve, reject) {
        Order.aggregate({
                $match: {status:'Delivered'}},
            {
                $group : {
                    _id : null,
                    total : {
                        $sum : "$price"
                    }
                }}
        ).then(totalMoney=> {
            console.log(totalMoney[0].total);
            revenue = totalMoney[0].total;
            resolve({revenue});
        });
    });
};

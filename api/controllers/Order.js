'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.deleteOrderById = function deleteOrderById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Order.deleteOrderById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findOrderById = function findOrderById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Order.findOrderById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



module.exports.getAllOrders = function getAllOrders (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var sort = req.swagger.params['sort'].value;
  var sort_col = req.swagger.params['sort_col'].value;
  var search_txt = req.swagger.params['search_txt'].value;
  var search_col = req.swagger.params['search_col'].value;
  Order.getAllOrders(offset,limit,sort,sort_col,search_txt,search_col)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);            })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putOrder = function putOrder (req, res, next) {
  var body = req.swagger.params['body'].value;
  Order.putOrder(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOrderById = function updateOrderById (req, res, next) {
  var body = req.swagger.params['body'].value;
  var id = req.swagger.params['id'].value;
  Order.updateOrderById(body,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

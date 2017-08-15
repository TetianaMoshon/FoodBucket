'use strict';

var utils = require('../utils/writer.js');
var Product = require('../service/ProductService');

module.exports.findProductById = function findProductById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Product.findProductById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllProducts = function getAllProducts (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var category_id = req.swagger.params['category_id'].value;
  var isActive = req.swagger.params['isActive'].value;
  Product.getAllProducts(offset,limit,category_id,isActive)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

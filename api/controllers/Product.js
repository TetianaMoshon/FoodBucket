'use strict';

var utils = require('../utils/writer.js');
var Product = require('../service/ProductService');

module.exports.createProduct = function createProduct (req, res, next) {
  var body = req.swagger.params['body'].value;
  Product.createProduct(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProductById = function deleteProductById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Product.deleteProductById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
  var isPromotion = req.swagger.params['isPromotion'].value;
  var sort = req.swagger.params['sort'].value;
  var sort_col = req.swagger.params['sort_col'].value;
  Product.getAllProducts(offset,limit,isPromotion,sort,sort_col)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);            })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.updateProductById = function updateProductById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var updatedProduct = req.swagger.params['updatedProduct'].value;
  Product.updateProductById(id,updatedProduct)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

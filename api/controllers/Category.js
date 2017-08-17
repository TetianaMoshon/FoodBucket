'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.findCategoryById = function findCategoryById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Category.findCategoryById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllCategories = function getAllCategories (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var isActive = req.swagger.params['isActive'].value;
  Category.getAllCategories(offset,limit,isActive)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

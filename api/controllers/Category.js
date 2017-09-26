'use strict';

var utils = require('../utils/writer.js');
var Category = require('../service/CategoryService');

module.exports.createCategory = function createCategory (req, res, next) {
  var body = req.swagger.params['body'].value;
  Category.createCategory(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCategoryById = function deleteCategoryById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Category.deleteCategoryById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCategoryImageById = function deleteCategoryImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Category.deleteCategoryImageById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
  var sort = req.swagger.params['sort'].value;
  var sort_col = req.swagger.params['sort_col'].value;
  var search_txt = req.swagger.params['search_txt'].value;
  var search_col = req.swagger.params['search_col'].value;
  Category.getAllCategories(offset,limit,sort,sort_col,search_txt,search_col)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postCategoryImageById = function postCategoryImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var file = req.swagger.params['file'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  Category.postCategoryImageById(id,file,additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putCategoryImageById = function putCategoryImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var file = req.swagger.params['file'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  Category.putCategoryImageById(id,file,additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCategoryById = function updateCategoryById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var updatedCategory = req.swagger.params['updatedCategory'].value;
  Category.updateCategoryById(id,updatedCategory)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

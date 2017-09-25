'use strict';

var utils = require('../utils/writer.js');
var Ingredient = require('../service/IngredientService');

module.exports.createIngredient = function createIngredient (req, res, next) {
  var body = req.swagger.params['body'].value;
  Ingredient.createIngredient(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteIngredientById = function deleteIngredientById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Ingredient.deleteIngredientById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteIngredientImageById = function deleteIngredientImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Ingredient.deleteIngredientImageById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findIngredientById = function findIngredientById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Ingredient.findIngredientById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllIngredients = function getAllIngredients (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var sort = req.swagger.params['sort'].value;
  var sort_col = req.swagger.params['sort_col'].value;
  var search_txt = req.swagger.params['search_txt'].value;
  var search_col = req.swagger.params['search_col'].value;
  Ingredient.getAllIngredients(offset,limit,sort,sort_col,search_txt,search_col)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);        })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.postIngredientImageById = function postIngredientImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var file = req.swagger.params['file'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  Ingredient.postIngredientImageById(id,file,additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putIngredientImageById = function putIngredientImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var file = req.swagger.params['file'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  Ingredient.putIngredientImageById(id,file,additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateIngredientById = function updateIngredientById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var updated_ingredient = req.swagger.params['updated_ingredient'].value;
  Ingredient.updateIngredientById(id,updated_ingredient)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

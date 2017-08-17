'use strict';

var utils = require('../utils/writer.js');
var Ingredient = require('../service/IngredientService');

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

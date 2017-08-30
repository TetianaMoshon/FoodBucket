var mongoose = require('mongoose');

var IngredientsSchema = require('../schema/ingredients');

var Ingredient = mongoose.model('Ingredient', IngredientsSchema);




module.exports = Ingredient;

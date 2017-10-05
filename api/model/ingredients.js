const mongoose = require('mongoose');

const ingredientsSchema = require('../schema/ingredients');

const Ingredient = mongoose.model('Ingredient', ingredientsSchema);

module.exports = Ingredient;

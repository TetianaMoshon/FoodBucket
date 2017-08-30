const mongoose = require('mongoose');

const IngredientsSchema = require('../schema/ingredients');

const Ingredient = mongoose.model('Ingredient', IngredientsSchema);




module.exports = Ingredient;

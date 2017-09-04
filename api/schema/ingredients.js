var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientsSchema = new Schema({
    ingredient_id: Number,
    title: String,
    description: String,
    image: String,
    measure: String,
    quantity: String,
    price: Number,
    discount: Number
});

module.exports = IngredientsSchema;

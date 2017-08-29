var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientsSchema = new Schema({
    id: Number,
    title: String,
    discription: String,
    image: String,
    measure: String,
    quantity: Number,
    price: Number,
    discount: Number
});

module.exports = IngredientsSchema;

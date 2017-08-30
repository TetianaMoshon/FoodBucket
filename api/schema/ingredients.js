const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
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

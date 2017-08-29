var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    image: String,
    category: [Number],
    info:{
        calories: Number,
        time: Number,
        steps: Number,
        difficutly: String,
        weight: Number
    },
    ingredients:[{ingredient: Number, quantity: Number}],
    price: {
        type: Number,
        required: true
    },
    discount: Number,
    promotions: Boolean,
    rate:{
        users_quantity: Number
    },
    status: Boolean,
    portion: Number,
    lable:[String]
});

module.exports = ProductsSchema;

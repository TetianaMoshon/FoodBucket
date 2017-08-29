var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    id: Number,
    title: String,
    discription: String,
    category: [Number],
    info:{
        calories: Number,
        time: Number
    },
    ingredients:[{ingredient: Number, quantity: Number}],
    price: Number,
    discount: Number,
    active: Boolean,
    promotions: Boolean,
    rate:{
        users_quantity: Number
    },
    status: Boolean,
    portion: Number,
    lable:[String]
});

module.exports = mongoose.model('Products', ProductsSchema);

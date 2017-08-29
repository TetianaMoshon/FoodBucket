var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    user:Number,
    user_name:String,
    city:String,
    adress: String,
    products:[Number],
    price:[Number],
    quantity_dishes: Number,
    payment: String,
    status: Boolean,
    data: Data
});

module.exports = mongoose.model('Orders', OrdersSchema);

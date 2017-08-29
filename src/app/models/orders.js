var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    user:Number,
    user_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    products:[Number],
    price:[Number],
    quantity_dishes: Number,
    payment: String,
    status: Boolean,
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', OrdersSchema);

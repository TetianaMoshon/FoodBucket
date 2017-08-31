let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrdersSchema = new Schema({
    user:Number,
    username:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    products: [Number],
    price:Number,
    quantity_dishes: Number,
    payment: String,
    status: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = OrdersSchema;

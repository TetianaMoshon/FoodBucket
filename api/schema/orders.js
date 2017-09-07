let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const counter = require('../model/counter');

let ordersSchema = new Schema({
    orderId:Number,
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
ordersSchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'orderId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.orderId = counter.seq;
        next();
    });
});

module.exports = ordersSchema;

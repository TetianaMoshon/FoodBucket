const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: Number,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    price: {
        type: Number,
        required: true
    }
    // category: [Number],
    //
    // ingredients: [{
    //     ingredient: Number,
    //     quantity: Number
    // }],
    //
    // discount: Number,
    // promotions: Boolean,
    // rate: {
    //     users_quantity: Number
    // },
    // status: Boolean,
    // portion: Number,
    // label:[String]
});

module.exports = productSchema;

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
    },
    category: String,
    recommended: [String],
    discount: Number,
    promotions: Boolean,
    status: Boolean,
    caloricity: Number,
    servingSize: Number,
    difficulty: String,
    spiceLevel: String
    // ingredients: [
    //     {
    //         ingredientName: Number,
    //         quantity: Number
    //     }
    // ]
    // rate: {
    //     users_quantity: Number
    // }
});

module.exports = productSchema;

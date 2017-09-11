const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    userId: {
        type: Number
    },
    orderedProducts: {
        type: [
                {
                    quantity: Number,
                    productId: Number
                }
            ],
        required: true
    },
    totalPriceOfAllDishes: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now }
});

module.exports = cartSchema;
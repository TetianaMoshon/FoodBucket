const mongoose = require('mongoose');
const counter = require('../model/counter');
const ingredient = require('../model/ingredients');

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
    status: Boolean,
    discount: Number,
    promotions: Boolean,
    caloricity: Number,
    servingSize: Number,
    difficulty: String,
    spiceLevel: String,
    ingredients: [
        {
            ingredientName: String,
            quantity: Number,
            measure: String
        }
    ]
});

productSchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'productId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.productId = counter.seq;
        next();
    });

});

module.exports = productSchema;

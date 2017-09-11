const mongoose = require('mongoose');
const counter = require('../model/counter');


const IngredientsSchema = mongoose.Schema({
    ingredient_id: Number,
    title: String,
    discription: String,
    image: String,
    measure: String,
    quantity: Number,
    price: Number,
    discount: Number
});

IngredientsSchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'ingredientId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.ingredient_id = counter.seq;
        next();
    });
});


module.exports = IngredientsSchema;

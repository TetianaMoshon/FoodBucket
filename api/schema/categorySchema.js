const mongoose = require('mongoose');
const counter = require('../model/counter');

const categorySchema = mongoose.Schema({
    category_id: {
        type: Number
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

categorySchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'categoryId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.category_id = counter.seq;
        next();
    });
});

module.exports = categorySchema;

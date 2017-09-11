const mongoose = require('mongoose');
const counter = require('../model/counter');


const
    userSchema = mongoose.Schema({
    user_id: Number,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    city: String,
    address: String,
    image: String,
    favourites: [Number],
    active: Boolean
});

userSchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'userId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.user_id = counter.seq;
        next();
    });
});

module.exports = userSchema;

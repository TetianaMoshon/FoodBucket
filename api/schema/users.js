var mongoose = require('mongoose');
var counter = require('../model/counter');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    userId: Number,
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
    create_at: Date,
    update_at: Date,
    active: Boolean
});

UsersSchema.pre('save', function(next) {
    let doc = this;
    counter.findByIdAndUpdate({_id: 'userId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.userId = counter.seq;
        next();
    });
});

module.exports = UsersSchema;

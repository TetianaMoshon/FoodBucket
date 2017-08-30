var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    id: Number,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
    adress: String,
    image: String,
    favourites: [Number],
    active: Boolean
});

module.exports = UserSchema;

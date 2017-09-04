var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    user_id: {
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
    /* id: Number,
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
    active: Boolean*/
});

module.exports = UserSchema;

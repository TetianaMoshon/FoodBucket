const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_id: Number,
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
    address: String,
    image: String,
    favourites: String,
    active: Boolean
});

module.exports = UserSchema;

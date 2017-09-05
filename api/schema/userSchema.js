var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    user_id: Number,
    first_name: String,
    last_name: String,
    email:  String,
    password: String,
    phone: Number,
    city: String,
    address: String,
    image: String,
    favourites: String,
    active: Boolean
});

module.exports = UserSchema;

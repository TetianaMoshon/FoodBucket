var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
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
    cteate_at: Date,
    update_at: Date,
    active: Boolean
});

module.exports = UsersSchema;

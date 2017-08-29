var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: String,
    city: String,
    adress: String,
    image: String,
    favourites: [Number],
    cteate_at: String,
    update_at: String,
    active: Boolean
});

module.exports = mongoose.model('Users', UsersSchema);

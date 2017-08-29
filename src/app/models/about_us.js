var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutUsSchema = new Schema({
    adress: String,
    phone: String,
    working_hours: String,
    lat: String,
    lan: String
});

module.exports = AboutUsSchema;

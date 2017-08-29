var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
    id: Number,
    title: String,
    discription: String,
    image: String
});

module.exports = CategoriesSchema;

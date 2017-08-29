var mongoose = require('mongoose');

var categorySchema = require('../schema/categorySchema');

var Category = mongoose.model('Category', categorySchema);




module.exports = Category;

const mongoose = require('mongoose');

const categorySchema = require('../schema/categorySchema');

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

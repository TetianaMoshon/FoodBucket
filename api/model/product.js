const mongoose = require('mongoose');

const productSchema = require('../schema/productSchema');

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

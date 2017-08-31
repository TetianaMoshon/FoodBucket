var mongoose = require('mongoose');

var cartSchema = require('../schema/cart');

var Cart = mongoose.model('Cart', cartSchema);




module.exports = Cart;


const mongoose = require('mongoose');

const cartSchema = require('../schema/cart');

const Cart = mongoose.model('Cart', cartSchema);




module.exports = Cart;


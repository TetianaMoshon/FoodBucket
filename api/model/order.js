const mongoose = require('mongoose');

const orderSchema = require('../schema/orders');

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

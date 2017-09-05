const mongoose = require('mongoose');

const counterSchema = require('../schema/counterSchema');

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;

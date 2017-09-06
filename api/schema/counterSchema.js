const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 1
    }
});

module.exports = counterSchema;

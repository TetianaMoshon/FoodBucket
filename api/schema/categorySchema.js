const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_id: {
        type: Number
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = categorySchema;

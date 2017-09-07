const mongoose = require('mongoose');

const usersSchema = require('../schema/users');

const Users = mongoose.model('users', usersSchema);

module.exports = Users;

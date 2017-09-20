'use strict';
const JsonWebToken = require('jsonwebtoken');

exports.createJWT = function(userId, isAdmin){
    let token = JsonWebToken.sign({userId, isAdmin}, '123');
    return token;
}

exports.checkJWT = function(token) {
    try {
        return JsonWebToken.verify(token, '123');
    } catch(err) {
        console.log(err);
    }

};

'use strict';
const JsonWebToken = require('jsonwebtoken');
const JWTinJWT = require('./JWTService');

exports.createJWT = function(userId, isAdmin){
    let token = JsonWebToken.sign({userId, isAdmin}, '123');
    return token;
};

exports.checkJWT = function(token) {
    try {
        return JsonWebToken.verify(token, '123');
    } catch(err) {
    }

};

exports.JWTBlock = function (req, res, next) {
    if (JWTinJWT.checkJWT(req.header('x-my-jwt')) && JWTinJWT.checkJWT(req.header('x-my-jwt')).isAdmin) {
        next()
    }
    else {
        res.status(403);
        res.end(JSON.stringify({code: 403, message: "Unauthorized"}));
    }
}

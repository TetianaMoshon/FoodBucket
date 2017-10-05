'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.login = function login (req, res, next) {
    var body = req.swagger.params['body'].value;
    Auth.login(body)
        .then(function (response) {
            res.header('X-MY-JWT', response.token);
            utils.writeJson(res, response.body);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.register = function register (req, res, next) {
    var body = req.swagger.params['body'].value;
    Auth.register(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.validation = function validation (req, res, next) {
  var xMYJWT = req.swagger.params['X-MY-JWT'].value;
  Auth.validation(xMYJWT)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



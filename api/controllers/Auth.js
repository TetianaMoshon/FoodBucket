'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.login = function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  Auth.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
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

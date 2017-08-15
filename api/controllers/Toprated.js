'use strict';

var utils = require('../utils/writer.js');
var Toprated = require('../service/TopratedService');

module.exports.getToprated = function getToprated (req, res, next) {
  Toprated.getToprated()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

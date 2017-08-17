'use strict';

var utils = require('../utils/writer.js');
var Promotion = require('../service/PromotionService');

module.exports.getPromotion = function getPromotion (req, res, next) {
  Promotion.getPromotion()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

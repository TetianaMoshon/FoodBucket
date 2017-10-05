'use strict';

var utils = require('../utils/writer.js');
var Promotion = require('../service/PromotionService');


module.exports.getPromotion = function getPromotion (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var isPromotion = req.swagger.params['isPromotion'].value;
  Promotion.getPromotion(offset,limit,isPromotion)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);                    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

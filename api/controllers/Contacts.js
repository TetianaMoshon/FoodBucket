'use strict';

var utils = require('../utils/writer.js');
var Contacts = require('../service/ContactsService');

module.exports.sendMessage = function sendMessage (req, res, next) {
  var body = req.swagger.params['body'].value;
  Contacts.sendMessage(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

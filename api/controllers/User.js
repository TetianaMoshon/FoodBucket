'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');


module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUserById = function deleteUserById (req, res, next) {
  var id = req.swagger.params['id'].value;
  User.deleteUserById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findUserById = function findUserById (req, res, next) {
  var id = req.swagger.params['id'].value;
  User.findUserById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllUsers = function getAllUsers (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var sort = req.swagger.params['sort'].value;
  var sort_col = req.swagger.params['sort_col'].value;
  var isActive = req.swagger.params['isActive'].value;
  var search_txt = req.swagger.params['search_txt'].value;
  var search_col = req.swagger.params['search_col'].value;
  User.getAllUsers(offset,limit,sort,sort_col,isActive,search_txt,search_col)
    .then(function (response) {
        res.setHeader("X-total-records", response.total);
        utils.writeJson(res, response.body);                })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUserImageById = function postUserImageById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var file = req.swagger.params['file'].value;
  var additionalMetadata = req.swagger.params['additionalMetadata'].value;
  User.postUserImageById(id,file,additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUserImageById = function postUserImageById (req, res, next) {
    var id = req.swagger.params['id'].value;
    var file = req.swagger.params['file'].value;
    var additionalMetadata = req.swagger.params['additionalMetadata'].value;
    User.putUserImageById(id,file,additionalMetadata)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updateUserById = function updateUserById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var updatedUser = req.swagger.params['updatedUser'].value;
  User.updateUserById(id,updatedUser)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

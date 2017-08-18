'use strict';


/**
 * Login operation
 * This endpoint allows to login. 
 *
 * body Login Login object
 * returns Login
 **/
exports.login = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "remember" : true,
  "password" : "password",
  "id" : 1,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Register operation
 * This endpoint allows to register. 
 *
 * body Register Register object
 * returns Register
 **/
exports.register = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "address" : "address",
  "city" : "city",
  "id" : 1,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


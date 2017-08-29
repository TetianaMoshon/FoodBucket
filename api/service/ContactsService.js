'use strict';


/**
 * Send message
 * This endpoint allows to send message. 
 *
 * body Contacts Contacts/message object
 * returns Contacts
 **/
exports.sendMessage = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "lastName" : "lastName",
  "name" : "name",
  "details" : "details",
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


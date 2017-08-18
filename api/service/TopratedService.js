'use strict';


/**
 *
 * returns Toprated
 **/
exports.getToprated = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "toprated_id" : 0,
  "description" : "description",
  "title" : "title",
  "products" : [ {
    "image" : "image",
    "price" : 6,
    "description" : "description",
    "ingredients" : [ {
      "image" : "image",
      "ingredient_id" : 1,
      "description" : "description",
      "title" : "title"
    }, {
      "image" : "image",
      "ingredient_id" : 1,
      "description" : "description",
      "title" : "title"
    } ],
    "id" : 1,
    "title" : "title",
    "productInfo" : [ {
      "product_info_id" : 5,
      "calories" : 5
    }, {
      "product_info_id" : 5,
      "calories" : 5
    } ]
  }, {
    "image" : "image",
    "price" : 6,
    "description" : "description",
    "ingredients" : [ {
      "image" : "image",
      "ingredient_id" : 1,
      "description" : "description",
      "title" : "title"
    }, {
      "image" : "image",
      "ingredient_id" : 1,
      "description" : "description",
      "title" : "title"
    } ],
    "id" : 1,
    "title" : "title",
    "productInfo" : [ {
      "product_info_id" : 5,
      "calories" : 5
    }, {
      "product_info_id" : 5,
      "calories" : 5
    } ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


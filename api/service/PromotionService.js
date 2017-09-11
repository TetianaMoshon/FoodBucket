'use strict';


/**
 *
 * returns Promotion
 **/
exports.getPromotion = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : "image",
  "description" : "description",
  "promotion_id" : 0,
  "title" : "title",
  "products" : [ {
    "image" : "image",
    "price" : 6,
    "description" : "description",
    "ingredients" : [ {
      "image" : "image",
      "measure" : "measure",
      "quantity" : 5,
      "ingredient_id" : 1,
      "price" : 5,
      "description" : "description",
      "discount" : 2,
      "title" : "title"
    }, {
      "image" : "image",
      "measure" : "measure",
      "quantity" : 5,
      "ingredient_id" : 1,
      "price" : 5,
      "description" : "description",
      "discount" : 2,
      "title" : "title"
    } ],
    "id" : 1,
    "title" : "title",
    "productInfo" : [ {
      "product_info_id" : 7,
      "calories" : 9
    }, {
      "product_info_id" : 7,
      "calories" : 9
    } ]
  }, {
    "image" : "image",
    "price" : 6,
    "description" : "description",
    "ingredients" : [ {
      "image" : "image",
      "measure" : "measure",
      "quantity" : 5,
      "ingredient_id" : 1,
      "price" : 5,
      "description" : "description",
      "discount" : 2,
      "title" : "title"
    }, {
      "image" : "image",
      "measure" : "measure",
      "quantity" : 5,
      "ingredient_id" : 1,
      "price" : 5,
      "description" : "description",
      "discount" : 2,
      "title" : "title"
    } ],
    "id" : 1,
    "title" : "title",
    "productInfo" : [ {
      "product_info_id" : 7,
      "calories" : 9
    }, {
      "product_info_id" : 7,
      "calories" : 9
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


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
    "productId" : 0,
    "caloricity" : 5,
    "description" : "description",
    "discount" : 1,
    "title" : "title",
    "difficulty" : "difficulty",
    "promotions" : true,
    "price" : 6,
    "ingredients" : [ {
      "ingredientId" : 2,
      "quantity" : 7,
      "measure" : "measure",
      "ingredientName" : "ingredientName"
    }, {
      "ingredientId" : 2,
      "quantity" : 7,
      "measure" : "measure",
      "ingredientName" : "ingredientName"
    } ],
    "category" : "category",
    "spiceLevel" : "spiceLevel",
    "servingSize" : 5,
    "status" : true
  }, {
    "image" : "image",
    "productId" : 0,
    "caloricity" : 5,
    "description" : "description",
    "discount" : 1,
    "title" : "title",
    "difficulty" : "difficulty",
    "promotions" : true,
    "price" : 6,
    "ingredients" : [ {
      "ingredientId" : 2,
      "quantity" : 7,
      "measure" : "measure",
      "ingredientName" : "ingredientName"
    }, {
      "ingredientId" : 2,
      "quantity" : 7,
      "measure" : "measure",
      "ingredientName" : "ingredientName"
    } ],
    "category" : "category",
    "spiceLevel" : "spiceLevel",
    "servingSize" : 5,
    "status" : true
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


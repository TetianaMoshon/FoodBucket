'use strict';


/**
 *
 * id Long ID of the product to get
 * returns Product
 **/
exports.findProductById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * category_id List returns products only from specified category (optional)
 * isActive Boolean returns active products (optional)
 * returns List
 **/
exports.getAllProducts = function(offset,limit,category_id,isActive) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


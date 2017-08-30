'use strict';


/**
 *
 * id Long ID of the category to get
 * returns Category
 **/
exports.findCategoryById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : "image",
  "category_id" : 0,
  "description" : "description",
  "title" : "title"
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
 * isActive Boolean returns active categories (optional)
 * returns List
 **/
exports.getAllCategories = function(offset,limit,isActive) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : "image",
  "category_id" : 0,
  "description" : "description",
  "title" : "title"
}, {
  "image" : "image",
  "category_id" : 0,
  "description" : "description",
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


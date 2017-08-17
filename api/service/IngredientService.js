'use strict';


/**
 *
 * id Long ID of the ingredient to get
 * returns Ingredient
 **/
exports.findIngredientById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : "image",
  "ingredient_id" : 1,
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


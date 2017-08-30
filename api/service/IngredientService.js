'use strict';
const Ingredient = require('../model/ingredient');

/**
 * Create ingredient
 * This endpoint allows to create new ingredient.
 *
 * body Ingredient Ingredient object
 * returns Ingredient
 **/
exports.createIngredient = function(body) {
  console.log(body);
    return new Promise(function(resolve, reject) {
    let newIngredient = {};
    let {image, measure, quantity, ingredient_id, price, description, discount, title} = body;
      newIngredient['application/json'] = new Ingredient ({
      "image": image,
      "measure" : measure,
      "quantity" : quantity,
      "ingredient_id" : ingredient_id,
      "price" : price,
      "description" : description,
      "discount" : discount,
      "title" : title
      });

      newIngredient['application/json'].save().then(
          inredientDoc => { console.log('Saved ingredient', inredientDoc); },
      error => { console.log('Unable to save ingredient'); }
  );

    if (Object.keys(newIngredient).length > 0) {
      resolve(newIngredient[Object.keys(newIngredient)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id Long ID of the ingredient to delete
 * no response value expected for this operation
 **/
exports.deleteIngredientById = function(id) {
  return new Promise(function(resolve, reject) {
      let oneIngredient = {};

      Ingredient.findOneAndRemove({ingredient_id: id}).then(
          oneIngredientDoc => {
          oneIngredient['application/json'] = oneIngredientDoc;

      if (Object.keys(oneIngredient).length > 0) {
          resolve(oneIngredient[Object.keys(oneIngredient)[0]]);
      } else {
          reject();
      }
  },
      error => { console.log('Unable to remove ingredient'); }
  );

  });
}


/**
 *
 * id Long ID of the ingredient to get
 * returns Ingredient
 **/
exports.findIngredientById = function(id) {
  return new Promise(function(resolve, reject) {
    let oneIngredient = {};
    Ingredient.findOne({ ingredient_id: id }).then(
          oneIngredientDoc => {
              oneIngredient['application/json'] = oneIngredientDoc;
              if (Object.keys(oneIngredient).length > 0) {
                  resolve(oneIngredient[Object.keys(oneIngredient)[0]]);
              } else {
                  reject();
              }
          },
        error => { console.log('Unable to get ingredient'); }
      );
  });
}


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * isActive Boolean returns active ingredient (optional)
 * returns List
 **/
exports.getAllIngredients = function(offset,limit,isActive) {
  return new Promise(function(resolve, reject) {
    let ingredients = {};
    Ingredient.find().then(
        ingredientsDoc => {
        ingredients['application/json'] = ingredientsDoc;


            if (Object.keys(ingredients).length > 0) {
                resolve(ingredients[Object.keys(ingredients)[0]]);
            } else {
                reject();
            }
        },
        error => { console.log('Unable to get ingredient'); }
    );
  });
}



/**
 *
 * id Long Id of the Ingredient being updated
 * updated_ingredient Ingredient The updated Ingredient
 * no response value expected for this operation
 **/
exports.updateIngredientById = function(id,updated_ingredient) {
  return new Promise(function(resolve, reject) {
      let oneIngredient = {};
      let { image, measure, quantity, ingredient_id, price, description, discount, title } = updated_ingredient;

      Ingredient.findOneAndUpdate({ ingredient_id: id },
          {
              "image": image,
              "measure" : measure,
              "quantity" : quantity,
              "price" : price,
              "description" : description,
              "discount" : discount,
              "title" : title

          }).then(
          (oneIngredientDoc) => {
              oneIngredient['application/json'] = updated_ingredient;
              if (Object.keys(oneIngredient).length > 0) {
                  resolve(oneIngredient[Object.keys(oneIngredient)[0]]);
              } else {
                  reject();
              }
          },
          (error) => { console.log('Unable to get ingredient'); }
      );
  });
};


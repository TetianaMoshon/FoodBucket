'use strict';
const Product = require('../model/product');
const debug = require('debug')('foodbucket:cartService');
const utils = require('../utils/writer');


/**
 *
 * q String query param to conduct a search in database
 * returns Product
 **/
exports.searchForProducts = function(q) {
  return new Promise(function(resolve, reject) {
      let products = {};

      const regex = new RegExp(q, 'i');
      Product.find(
          { $or: [ {title: regex}, {category: regex} ] }
          )
          .limit(5)
          .then(oneProductDoc => {
                   products = oneProductDoc || {};
                   if (Object.keys(products).length > 0) {
                       resolve(products);
                   } else {
                       resolve(utils.respondWithCode(204));
                   }
               },
               error => { console.log('Unable to get product or category', error); }
               );
  }).catch(err =>{
      debug("Error is: %O", err);
  });
}


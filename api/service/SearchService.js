'use strict';
const Product = require('../model/product');

/**
 *
 * q String query param to conduct a search in database
 * returns Product
 **/
exports.searchForProducts = function(q) {
  return new Promise(function(resolve, reject) {
      let products = {};
      Product.find({
        $text: {
            $search: q
        }
    }, {
        score: {$meta: 'textScore'}
    })
   .then(oneProductDoc => {
                   products = oneProductDoc || {};
                   if (Object.keys(products).length > 0) {
                       resolve(products);
                   } else {
                       reject( console.log('Product is not found, please try again.'));
                   }
               },
               error => { console.log('Unable to get product or category', error); }
               );
  });
}


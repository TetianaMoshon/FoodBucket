'use strict';
const Product = require('../model/product');
const utils = require('../utils/writer.js');


/**
 *
 * returns Promotion
 **/
exports.getPromotion = function(offset,limit, isPromotion) {
    return new Promise((resolve, reject) => {
        const query = isPromotion!==undefined? {promotions:isPromotion}: {};
        return Product.count().then(
            total => {
                Product.find(query).skip(offset).limit(limit).then(
                    promotionsDoc => {
                        promotionsDoc = promotionsDoc || {};
                        if (Object.keys(promotionsDoc).length > 0) {
                            promotionsDoc = promotionsDoc.map(({productId, title, description, image, price, category, caloricity, servingSize, difficulty, spiceLevel, recommended, discount, promotions, status, ingredients}) => {
                                return {
                                    productId,
                                    title,
                                    description,
                                    image,
                                    price,
                                    category,
                                    caloricity,
                                    servingSize,
                                    difficulty,
                                    spiceLevel,
                                    recommended,
                                    discount,
                                    promotions,
                                    status,
                                    ingredients
                                };
                            });
                            resolve({total: total, body: utils.respondWithCode(200, promotionsDoc)});
                        }
                        else {
                            reject(utils.respondWithCode(404, {"code": 404, "message": "Products are not found, please try again."}));
                        }
                    },
                    error => { console.log('Unable to get products', error); }
                );
            }
        )

    });
}


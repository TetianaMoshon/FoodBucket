'use strict';
const utils = require('../utils/writer.js');
const User = require('../model/user');
const imageService = require('./common/ImageService');
const debug = require('debug')('foodbucket:userService');


/**
 * Create user
 * This endpoint allows to create new user.
 *
 * body User User object
 * returns User
 **/
exports.createUser = function ({firstName, lastName, email, password, phone, city, address, image, favourites, active}) {
    return new Promise((resolve, reject) => {

        let newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            city,
            address,
            image,
            favourites,
            active
        });

        newUser.save().then(
            userDoc => {
                if (Object.keys(userDoc).length > 0) {
                    let {firstName, lastName, email, password, phone, city, address, image, favourites, active} = userDoc;
                    resolve(utils.respondWithCode(201, {firstName, lastName, email, password, phone, city, address, image, favourites, active}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "User is not created, please try again."}));
                }
                console.log('Saved user', userDoc);
            },
            error => {
                console.log('Unable to save user: ', error);
            }
        );
    });
};

/**
 *
 * id Long ID of the user to delete
 * no response value expected for this operation
 **/
exports.deleteUserById = function(id) {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({ userId: id }).then(
            oneUserDoc => {
                oneUserDoc = oneUserDoc || {};
                if (Object.keys(oneUserDoc).length > 0) {
                    let {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active} = oneUserDoc;
                    resolve(utils.respondWithCode(200, {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "User is not deleted, please try again."}));
                }
            },
            error => { console.log('Unable to remove user: ', error); }
        );
    });
};

/**
 *
 * id Long ID of the user to get
 * returns User
 **/
exports.findUserById = function (id) {
    return new Promise((resolve, reject) => {
        User.findOne({ userId: id }).then(
            oneUserDoc => {
                oneUserDoc = oneUserDoc || {};
                if (Object.keys(oneUserDoc).length > 0) {
                    let {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active} = oneUserDoc;
                    resolve(utils.respondWithCode(200, {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "User is not found, please try again."}));
                }
            },
            error => { console.log('Unable to get user: ', error); }
        );
    });
};


/**
 *
 * offset Integer start position for quering from DB
 * limit Integer number of items to query from DB
 * isActive Boolean returns active users (optional)
 * returns List
 **/
exports.getAllUsers = function (offset, limit, sort, sort_col, isActive, search_txt, search_col) {
    return new Promise((resolve, reject) => {
        let query = {};
        if (search_col && search_txt) {
            if (isNaN(search_txt)) {
                const regex = new RegExp(search_txt, "i");
                query = {[search_col]: regex};
            } else {
                query = {[search_col]: search_txt};
            }

        }
        return User.count().
        then(
            total => {
                User.find(query).skip(offset).limit(limit).sort({[sort_col]: sort}).where({
                    'active': {
                        $gte: true
                    }
                }).then(
                    usersDoc => {
                        usersDoc = usersDoc || [];
                        if (Object.keys(usersDoc).length > 0) {
                            usersDoc = usersDoc.map( ({ userId, firstName, lastName, email, password, phone, city, address, image, favourites, active }) => {
                                return { userId, firstName, lastName, email, password, phone, city, address, image, favourites, active };
                            });
                            resolve({total: total, body: utils.respondWithCode(200, usersDoc)});
                        } else {
                            reject(utils.respondWithCode(404, {"code": 404, "message": "Users are not found, please try again."}));
                        }
                    },
                    error => { console.log('Unable to get users: ', error); }
                );
            }
        )

    });
};


/**
 *
 * id Long Id of the User being updated
 * updatedUser User The updated User
 * no response value expected for this operation
 **/
exports.updateUserById = function(id, updatedUser) {
    return new Promise((resolve, reject) => {
        let {firstName, lastName, email, password, phone, city, address, image, favourites, active } = updatedUser;

        User.findOneAndUpdate({ userId: id }, {firstName, lastName, email, password, phone, city, address, image, favourites, active }).then(
            oneUser => {
                if (Object.keys(updatedUser).length > 0 && oneUser !== null) {
                    let userId = oneUser.userId;
                    resolve(utils.respondWithCode(200, {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "User is not updated, please try again."}));
                }
            },
            error => { console.log('Unable to get user: ', error); }
        );
    });
};



/**
 *
 * id Long ID of the user image upload for
 * file File  (optional)
 * additionalMetadata String Additional data to pass to server (optional)
 * no response value expected for this operation
 **/
exports.postUserImageById = function(id,file,additionalMetadata) {
    return new Promise((resolve, reject) => {
        let entityName = 'user';
        User.findOne({ userId: id }).then(user => {
            return imageService.uploadImage(user.userId, entityName, file);
        }).then(pathToStoreInDB => {
            return User.findOneAndUpdate({ userId: id }, { $set: { image: pathToStoreInDB } }, { new: true }).then(
                oneUser => {
                    if (pathToStoreInDB !== undefined && pathToStoreInDB !== null && oneUser !== null) {
                        let {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active } = oneUser;
                        resolve(utils.respondWithCode(200, {userId, firstName, lastName, email, password, phone, city, address, image, favourites, active}));
                    } else {
                        reject(utils.respondWithCode(400, {"code": 404, "message": "User is not updated, please try again."}));
                    }
                },
                error => { debug('Unable to get user: %O', error); }
            );
        }).catch(e => {
            debug(e);
        });
    });
}





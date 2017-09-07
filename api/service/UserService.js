'use strict';
const utils = require('../utils/writer.js');
const User = require('../model/user');
const Product = require('../service/ProductService');

/**
 * Create user
 * This endpoint allows to create new user.
 *
 * body User User object
 * returns User
 **/
exports.createUser = function ({first_name, last_name, email, password, phone, city, address, image, favourites, active}) {
    return new Promise((resolve, reject) => {

    let newUser = new User({
            first_name,
            last_name,
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
                    let {first_name, last_name, email, password, phone, city, address, image, favourites, active} = userDoc;
                    resolve(utils.respondWithCode(201, {first_name, last_name, email, password, phone, city, address, image, favourites, active}));
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
        User.findOneAndRemove({ user_id: id }).then(
            oneUserDoc => {
                oneUserDoc = oneUserDoc || {};
                if (Object.keys(oneUserDoc).length > 0) {
                    let {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active} = oneUserDoc;
                    resolve(utils.respondWithCode(200, {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active}));
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
        User.findOne({ user_id: id }).then(
            oneUserDoc => {
                oneUserDoc = oneUserDoc || {};
                if (Object.keys(oneUserDoc).length > 0) {
                    let {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active} = oneUserDoc;
                    resolve(utils.respondWithCode(200, {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active}));
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
exports.getAllUsers = function (offset, limit, isActive) {
    return new Promise((resolve, reject) => {
        User.find().then(
            usersDoc => {
                usersDoc = usersDoc || [];
                if (Object.keys(usersDoc).length > 0) {
                    usersDoc = usersDoc.map( ({ user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active }) => {
                        return { user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active };
                    });
                    resolve(utils.respondWithCode(200, usersDoc));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Users are not found, please try again."}));
                }
            },
            error => { console.log('Unable to get users: ', error); }
        );
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
        let {first_name, last_name, email, password, phone, city, address, image, favourites, active } = updatedUser;

        User.findOneAndUpdate({ user_id: id }, {first_name, last_name, email, password, phone, city, address, image, favourites, active }).then(
            oneUser => {
                if (Object.keys(updatedUser).length > 0 && oneUser !== null) {
                    let user_id = oneUser.user_id;
                    resolve(utils.respondWithCode(200, {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active}));
                } else {
                    reject(utils.respondWithCode(400, {"code": 404, "message": "User is not updated, please try again."}));
                }
            },
            error => { console.log('Unable to get user: ', error); }
        );
    });
};

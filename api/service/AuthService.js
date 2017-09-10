'use strict';
const utils = require('../utils/writer.js');
const Users = require('../model/users');
const Bcrypt = require('bcrypt-nodejs');

/**
 * Login operation
 * This endpoint allows to login.
 *
 * body Login Login object
 * returns Login
 **/

exports.login = function ({email, password}) {
    return new Promise((resolve, reject) => {
        Users.findOne({ email: email }).then(
            oneUserDoc => {
                if(Bcrypt.compareSync(password, oneUserDoc.password)) {
                    return oneUserDoc;
                }
            },
            error => { reject(utils.respondWithCode(404, {"code": 404, "message": "User is not found, please try again."})); }
        )
            .then(
                oneUserDoc => {
                    oneUserDoc = oneUserDoc || {};
                    if (Object.keys(oneUserDoc).length > 0) {
                        let {email, userId, firstName, lastName, city, address} = oneUserDoc;
                        resolve(utils.respondWithCode(200, {email, userId, firstName, lastName, city, address}));
                    } else {
                        reject(utils.respondWithCode(404, {
                            "code": 404,
                            "message": "User is not found, please try again."
                        }));
                    }
                }
            );
    });
};

/**
 * Register operation
 * This endpoint allows to register.
 *
 * body Register Register object
 * returns Register
 **/
exports.register = function ({ firstName, lastName, email, password, phone, city, address, image }) {
    return new Promise((resolve, reject) => {
        const hashedPassword = Bcrypt.hashSync(password);
        let newUser = new Users({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": hashedPassword,
            "phone": phone,
            "city": city,
            "address": address,
            "image": image,
            "active": true
        });

        newUser.save().then(
            userDoc => {
                if (Object.keys(userDoc).length > 0) {
                    let {userId, firstName, lastName, email, password, phone, city, address, image, create_at, update_at, active} = userDoc;
                    resolve(utils.respondWithCode(201, {userId, firstName, lastName, email, password, phone, city, address, image, create_at, update_at, active}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "Category is not created, please try again."}));
                }
                console.log('Saved category', userDoc);
            },
            error => { console.log('Unable to save category: ', error); }
        );
    });
};




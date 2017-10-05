'use strict';
const utils = require('../utils/writer.js');
const Users = require('../model/users');
const Bcrypt = require('bcrypt-nodejs');
const JWT = require('./JWTService');

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
                if(oneUserDoc) {
                    if (Bcrypt.compareSync(password, oneUserDoc.password)) {
                        return oneUserDoc;
                    }
                }
            },
            error => { reject(utils.respondWithCode(403, {"code": 403, "message": "User is not found, please try again."})); }
        )
            .then(
                oneUserDoc => {
                    oneUserDoc = oneUserDoc || {};
                    if (Object.keys(oneUserDoc).length > 0) {
                        let {email, userId, firstName, lastName, city, address, isAdmin} = oneUserDoc;
                        let tokenBody = {userId, isAdmin};
                        let token = JWT.createJWT(tokenBody.userId, tokenBody.isAdmin);
                        resolve({token: token, body: utils.respondWithCode(200, {email, userId, firstName, lastName, city, address})});
                    } else {
                        reject(utils.respondWithCode(403, {
                            "code": 403,
                            "message": "Unauthorised , please try again."
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
        Users.findOne({ email: email })
            .then( obj => {
                    if (obj) {
                        reject(utils.respondWithCode(403, {"code": 403, "message": "User is not unique, please try again."}));
                        return;
                    }
                    const hashedPassword = Bcrypt.hashSync(password);
                    let newUser = new Users({
                        firstName, lastName, email,
                        "password": hashedPassword,
                        phone, city, address, image,
                        "active": true,
                        "isAdmin": false
                    });
                    return newUser.save();
                },
                error => { reject(utils.respondWithCode(502, {"code": 503, "message": "Server Err"})); }
            ).then(
            userDoc => {
                if (Object.keys(userDoc).length > 0) {
                    let {userId, firstName, lastName, email, phone, city, address, image, create_at, update_at, active} = userDoc;
                    resolve(utils.respondWithCode(201, {userId, firstName, lastName, email, phone, city, address, image, create_at, update_at, active}));
                } else {
                    reject(utils.respondWithCode(404, {"code": 404, "message": "User is not register, please try again."}));
                }
                console.log('User registration is completed', userDoc);
            },
            error => { console.log('Unable to register user: ', error); }
        );
    });
};

/**
 * Validation operation
 * This endpoint allows to register.
 *
 * xMYJWT String Validation object
 * returns Validation
 **/
exports.validation = function(xMYJWT) {
  return new Promise(function(resolve, reject) {
   const response = {
  "isValid" : JWT.checkJWT(xMYJWT).isAdmin
};
    if (Object.keys(response).length > 0) {
      resolve(response);
    } else {
      reject();
      return;
    }
  });
}


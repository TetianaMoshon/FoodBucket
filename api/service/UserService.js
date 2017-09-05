'use strict';
const User = require('../model/user');

exports.findUserById = function (id) {
    return new Promise((resolve, reject) => {
        let oneUser = {};

        User.findOne({user_id: id}).then(
            oneUserDoc => {
                oneUser = oneUserDoc;
                if (Object.keys(oneUser).length > 0) {
                    resolve(oneUser);
                } else {
                    reject();
                }
            },
            error =>{
                console.log('Unable to get user: ', error);
            }
        );
    });
}

exports.getAllUsers = function (offset, limit, isActive) {
    return new Promise((resolve, reject) => {
        let users = [];
        User.find().then(
            usersDoc => {
                users = usersDoc;

                if (Object.keys(users).length > 0) {
                    resolve(users);
                } else {
                    reject();
                }
            },
            error =>
            {
                console.log('Unable to get users: ', error);
            }
        );
    });
}

exports.createUser = function (body) {
    return new Promise((resolve, reject) => {
        let { user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active} = body;
        let newUser = new User({
            "user_id": user_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "phone": phone,
            "city": city,
            "address": address,
            "image": image,
            "favourites": favourites,
            "active": active
        });

        newUser.save().then(
            userDoc => { console.log('Saved user', userDoc); },
            error => { console.log('Unable to save user: ', error); }
        );

        if (Object.keys(newUser).length > 0) {
            resolve(newUser);
        } else {
            reject();
        }
    });
}

exports.deleteUserById = function(id) {
    return new Promise((resolve, reject) => {
        let oneUser = {};

        User.findOneAndRemove({ user_id: id }).then(
            oneUserDoc => {
                oneUser = oneUserDoc;
                if (Object.keys(oneUser).length > 0) {
                    resolve(oneUser);
                } else {
                    reject();
                }
            },
            error => { console.log('Unable to remove user: ', error); }
        );
    });
}

exports.updateUserById = function (id, updatedUser) {
    return new Promise((resolve, reject) => {
        let {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active} = updatedUser;

        User.findOneAndUpdate({user_id: id}, {user_id, first_name, last_name, email, password, phone, city, address, image, favourites, active}).then(
            () => {
                if (Object.keys(updatedUser).length > 0) {
                    resolve(updatedUser);
                }
                else {
                    reject();
                }
            },
            error => {
                console.log('Unable to get user: ', error);
            }
        );
    });
}


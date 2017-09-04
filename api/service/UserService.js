'use strict';
const User = require('../model/user');
/*work*/
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

        )
        ;
    })
        ;
}
/*work*/
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
        )
        ;
    });
}
/*work*/
exports.createUser = function (body) {
    return new Promise((resolve, reject) => {
        let { user_id, title, image, description } = body;
        let newUser = new User({
            "user_id": user_id,
            "title": title,
            "image": image,
            "description": description
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
        let {title, image, description} = updatedUser;

        User.findOneAndUpdate({category_id: id}, {title, image, description}).then(
            () => {
                if (Object.keys(updatedUser).length > 0
                )
                {
                    resolve(updatedUser);
                }
                else
                {
                    reject();
                }
            },
            error =>
            {
                console.log('Unable to get user: ', error);
            }
        );
    });
}


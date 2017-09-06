'use strict';

const Counter =  require('../api/model/counter');
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

exports.initDb = function () {
    return new Promise((resolve, reject) => {
        try {
            const config = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, '/foodbucket.yaml'), 'utf8'));
            resolve(config);
        } catch (err) {
            reject(err);
        }
    }).then( config => {
        config.foodbucket.sequenceIds.forEach(id => {
            Counter.count({_id: id}, (err, count) => {
                if (err) {
                    throw err
                }
                if (count < 1) {
                    new Counter({
                        "_id": id,
                        "seq": 1
                    }).save((err, sequence) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Set sequence for " + sequence._id);
                    });
                }
            });
        });
        return "Sequences are up to date";
    }).catch(err => {
        console.log(err)
    })
};

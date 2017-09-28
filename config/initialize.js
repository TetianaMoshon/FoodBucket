'use strict';

const Counter =  require('../api/model/counter');
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('foodbucket:init');

const configPromise = new Promise((resolve, reject) => {
    try {
        const config = jsyaml.safeLoad(fs.readFileSync(path.join(__dirname, '/foodbucket.yaml'), 'utf8'));
        resolve(config);
    } catch (err) {
        reject(err);
    }
});

exports.initDb = function () {
    return configPromise.then( config => {
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
                        debug("Set sequence for %s", sequence._id);
                    });
                }
            });
        });
        return "Sequences are up to date";
    }).catch(err => {
        debug("Error: %O", err)
    })
};

exports.initFolders = () => {
    return configPromise.then(config => {
        const sep = path.sep;
        config.foodbucket.folders.forEach(folder => {
            let imgPath = `../public/image/${folder}`;
            let initDir = path.isAbsolute(imgPath) ? sep : '';
            imgPath.split(sep).reduce((parentDir, childDir)=>{
                let curDir = path.resolve(__dirname, parentDir, childDir);
                if (!fs.existsSync(curDir)) {
                    fs.mkdirSync(curDir);
                    debug('creating: ', curDir);
                }
                return curDir;
            }, initDir);
        });
        debug("All folders up to date!")
    }).catch(err => {
        debug("Error: %O", err)
    })
};

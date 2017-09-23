const fs = require('fs');
const debug = require('debug')('foodbucket:imageService');

exports.uploadImage = function(id, entityName, file) {
    return new Promise( (resolve, reject) => {
        const fileName =  id + file.originalname.slice(file.originalname.lastIndexOf('.') );

        const pathToStoreInDB = entityName + '/' + fileName;
        const pathToStoreOnDisk = 'public/image/' + pathToStoreInDB;

        fs.writeFile( pathToStoreOnDisk, file.buffer, err => {
            err ? reject(err) : resolve(pathToStoreInDB);
        });
    });
}

exports.deleteImage = function(entityName, fileName) {
    return new Promise( (resolve, reject) => {
        const filePath = 'public/image/' + fileName;

        fs.unlink( filePath, err => {
            err ? reject(err) : resolve(filePath);
        });
    });
}

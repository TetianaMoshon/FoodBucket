const fs = require('fs');
const debug = require('debug')('foodbucket:imageService');

exports.uploadImage = function(id, entityName, file) {
    return new Promise( (resolve, reject) => {
        //const fileName =  id + // '_' + Date.now() +
          //  file.originalname.slice(file.originalname.lastIndexOf('.') ); // file extension

        // const pathToStoreInDB = entityName + '/' + fileName;
        // const pathToStoreOnDisk = 'public/image/' + pathToStoreInDB;

        const pathToStoreInDB = 'category/123.jpg';
        const pathToStoreOnDisk = 'public/image/' + pathToStoreInDB;

        // fs.writeFile( pathToStoreOnDisk, file.buffer, err => {
        fs.writeFile( pathToStoreOnDisk, file, err => {
            err ? reject(err) : resolve(pathToStoreInDB);
        });
    });
}

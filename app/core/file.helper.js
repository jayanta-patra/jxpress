//requiring path and fs modules
const path = require('path');
const fs = require('fs');

module.exports = {
    getFiles: (presentDirectory, directoryName) => {

        return new Promise((resolve, reject) => {
            //joining path of directory 
            const directoryPath = path.join(presentDirectory, directoryName);

            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    console.log('Unable to scan directory: ' + err);
                    reject(err)
                }    
                resolve(files)
            });
        })


    }
}
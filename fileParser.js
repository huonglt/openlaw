const fs = require('fs');
const path = require('path');

/**
 * Read content of an ascii file
 * @param {string} filePath Full path to the file to read
 * @returns {Promise} The promise which will resolve when file read ok, reject when read file fails
 */
const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        return fs.readFile(filePath, '', function(err, data) {
            if (err) throw reject(err);
            resolve(data.toString());
        });
    });
}

/**
 * The main function to parse the file
 * @param {string} filePath Full path to the file to parse
 */
async function parse(filePath) {
    const fileContent = await readFile(filePath);
    console.log(`fileContent = ${JSON.stringify(fileContent)}`);
}
/*
const filePath = path.resolve(__dirname, 'uploadDir/addFeature.js');
parse(filePath);*/

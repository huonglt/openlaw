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
 * Parse file content to find the total word count, and word occurences
 * @param {string} fileContent The string content of the file
 * @returns {Object} The Javascript object with totalWordCount, and wordOccurences properties
 */
const parseFileContent = (fileContent) => {
    let initialValue = {
        totalWordCount: 0,
        wordOccurences: {}
    };
    const lines = fileContent.split('\n');
    const result = lines.reduce((accumulator, line) => {
        const words = line.split(' ');
        return {
            totalWordCount: accumulator.totalWordCount + words.length
        }
    }, initialValue);
    return result;
};

/**
 * The main function to parse the file
 * @param {string} filePath Full path to the file to parse
 */
async function parse(filePath) {
    const fileContent = await readFile(filePath);
    const result = parseFileContent(fileContent);
    console.log(`parsed file result = ${JSON.stringify(result)}`);
}

const filePath = path.resolve(__dirname, 'uploadDir/addFeature.js');
parse(filePath);

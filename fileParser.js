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
            if (err) {
                reject(err);
            }
            resolve(data.toString());
        })
    });
}

/**
 * Build a table/dictionary containing unique word and its occurence count
 * @param {Array[string]} words An array of word
 * @param {Object} initialValue The initial value for the accumulator of the reducer function
 * @returns {Object} The JS Object with each unique word as key, and its occurence count as value 
 */
const wordOccurenceTable = (words, initialValue) => {
    return words.reduce((accumulator, word) => {
        accumulator[word] = (accumulator[word]) ? accumulator[word] + 1 : 1;
        return accumulator;
    }, initialValue);
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
            totalWordCount: accumulator.totalWordCount + words.length,
            wordOccurences: wordOccurenceTable(words, accumulator.wordOccurences)
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
    return parseFileContent(fileContent);
}

module.exports = {
    parse,
    wordOccurenceTable
};
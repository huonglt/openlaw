const fileParser = require('../fileParser');
const path = require('path');

test('parsing sample1.txt file', () => {
    const testDataFile = path.resolve(__dirname, 'data/sample1.txt');
    fileParser.parse(testDataFile).then(result => {
        expect(result.totalWordCount).toBe(6);
        expect(result.wordOccurences).toEqual({'1': 1, '2': 1, '3': 1, 'Line': 3});
    });
  });
const fileParser = require('../fileParser');
const path = require('path');

test('test wordOccurenceTable method', () => {
    const words = ['apple', 'orange', 'orange', 'blue', 'red'];
    const actual = fileParser.wordOccurenceTable(words, {});
    const expected = {
        'apple': 1,
        'orange': 2,
        'blue': 1,
        'red': 1
    };
    expect(actual).toEqual(expected);
});

test('parsing sample1.txt file', () => {
    const testDataFile = path.resolve(__dirname, 'data/sample1.txt');
    fileParser.parse(testDataFile).then(result => {
        expect(result.totalWordCount).toBe(6);
        expect(result.wordOccurences).toEqual({'1': 1, '2': 1, '3': 1, 'Line': 3});
    });
});
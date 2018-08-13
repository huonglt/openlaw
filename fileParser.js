const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        return fs.readFile(filePath, '', function(err, data) {
            if (err) throw reject(err);
            resolve(data.toString());
        });
    });
}

async function parse(filePath) {
    const fileContent = await readFile(filePath);
    console.log(`fileContent = ${JSON.stringify(fileContent)}`);
}
/*
const filePath = path.resolve(__dirname, 'uploadDir/addFeature.js');
parse(filePath);*/

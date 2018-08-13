const http = require('http');
const formidable = require('formidable');
const path = require('path');
const fileParser = require('./fileParser');

const HTTP_PORT = 8081;
const UPLOAD_DIR = 'uploadDir';

/**
 * Setting for formidable
 * File uploaded will be copied to the UPLOAD_DIR, keeping the file name and its extension
 */
const form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.keepExtensions = true;
form.type = 'multipart/form-data';
form.uploadDir = path.resolve(__dirname, UPLOAD_DIR);

/**
 * Create HTTP server listening on port ${HTTP_PORT}
 * The server only response to requests with path /upload and method of POST
 * When file is uploaded, the file parser will parse the file
 */
http.createServer((req, res) => {
    if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
        
        form.parse(req);
        form.on('fileBegin', function(name, file) {
            file.path = form.uploadDir + '/' + file.name;
        });
        form.on('file', function(name, file) {
            fileParser.parse(file.path).then(parsedResult => console.log(`parsedResult = ${JSON.stringify(parsedResult)}`));
        });
    }
}).listen(HTTP_PORT);

console.log(`server is running on port ${HTTP_PORT}`);
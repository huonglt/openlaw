const http = require('http');
const formidable = require('formidable');
const path = require('path');
const fileParser = require('./fileParser');
const fs = require('fs');

const HTTP_PORT = 8081;
const UPLOAD_DIR_PATH = path.resolve(__dirname, 'uploadDir');

/**
 * Handle error emitted of the server, so that it is still running
 */
process.on('uncaughtException', function (err) {
    console.log('UncaughtException: ', err);
});

/**
 * Create folder uploadDir to store uploaded files if needed
 */
if(!fs.existsSync(UPLOAD_DIR_PATH)) {
    fs.mkdirSync(UPLOAD_DIR_PATH);
}

/**
 * Setting for formidable
 * File uploaded will be copied to the UPLOAD_DIR, keeping the file name and its extension
 */
const createIncomingForm = () => {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.type = 'multipart/form-data';
    form.uploadDir = UPLOAD_DIR_PATH;
    form.maxFileSize = 10 * 1024 * 1024; // maximum of 10MB file
    return form;
}

/**
 * Create HTTP server listening on port ${HTTP_PORT}
 * The server only response to requests with path /upload and method of POST
 * When file is uploaded, the file parser will parse the file
 */
http.createServer((req, res) => {
    const writeResponseData = (obj) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(obj || {}));
        res.end();
    };
    try {
        if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
            const form = createIncomingForm();

            let fullFilePath;
            form.parse(req);

            form.on('fileBegin', (name, file) => {
                file.path = form.uploadDir + '/' + file.name;
                fullFilePath = file.path;
            });

            /**
             * When the entire request has been received, parse the uploaded file, and send the result back as json
             * Allow CORS by setting Access-Control-Allow-Origin to the header of the response
             */
            form.on('end', () => {
                fileParser.parse(fullFilePath).then(parsedResult => {
                    writeResponseData(parsedResult);
                }).catch(err => {
                    writeResponseData(err);
                });
            });

            form.on('error', function(err) {
                writeResponseData({
                    errMsg: 'File either > 10MB , or not ascii file'
                });
            });
        } 
    } catch(err) {
        console.log(`err = ${JSON.stringify(err)}`);
    }
}).listen(HTTP_PORT);


console.log(`server is running on port ${HTTP_PORT}`);
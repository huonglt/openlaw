const http = require('http');
const formidable = require('formidable');
const path = require('path');

const form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.keepExtensions = true;
form.type = 'multipart/form-data';
form.uploadDir = path.resolve(__dirname, 'uploadDir');

http.createServer((req, res) => {
    if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
        form.parse(req);
        form.on('fileBegin', function(name, file) {
            console.log(`fileBegin: name = ${name}, file = ${JSON.stringify(file)}`);
            file.path = form.uploadDir + '/' + file.name;
        });
    }
}).listen(8081);

console.log(`server is running on port 8081`);
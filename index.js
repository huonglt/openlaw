const http = require('http');

http.createServer((req, res) => {
    if(req.url === '/upload' && req.method.toLowerCase() === 'post') {
    }
}).listen(8081);

console.log(`server is running on port 8081`);
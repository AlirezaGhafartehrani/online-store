let http = require('http');

http.createServer(function (request, response) {
    if (request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        response.write('hello sweet');
        response.end();
    } else if (request.method === 'POST') {
        response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        response.write('hello sweet');
        response.end();
    }
}).listen(8080);
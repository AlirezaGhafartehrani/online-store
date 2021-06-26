let http = require('http');
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "webAdmin",
    password: "AUgEPslVcgf9RI6z"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE web_db", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

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
// data base
let mysql = require('mysql');
let db = mysql.createConnection({
    host: "localhost",
    user: "webAdmin",
    password: "AUgEPslVcgf9RI6z",
    database: "web_db"
});

initDB(db, false);

// server
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res) {
    authentication(db, req.body.username, req.body.password).then(r =>
        console.log(r));

    res.set({
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
    });
    res.send();
});
app.post('/', function (req, res) {

    authentication(db, req.body.username, req.body.password).then(r =>
        console.log(r));


    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
    });
    res.send();
});

app.post('/sign-up', function (req, res) {

    authentication(db, req.body.username, req.body.password).then(r =>
        console.log(r));


    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
    });
    res.send();
});



app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});


// functions
function initDB(con, tables) {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        if (tables) {
            let sql;
            sql = "CREATE TABLE users (" +
                "username VARCHAR(255) not null, " +
                "password VARCHAR(15) not null, " +
                "full_name VARCHAR(255) not null," +
                "address VARCHAR(300)," +
                "balance NUMERIC(12, 2) default 0 check (balance >= 0)," +
                "PRIMARY KEY (username)" +
                ");";
            con.query(sql, function (err) {
                    if (err) throw err;
                    console.log("User table created.");
                }
            );

            sql = "CREATE TABLE categories (" +
                "name VARCHAR(100) not null default 'uncategorized'," +
                "PRIMARY KEY (name)" +
                ");";
            con.query(sql, function (err) {
                    if (err) throw err;
                    console.log("Category table created.");
                }
            );

            sql = "CREATE TABLE goods (" +
                "name VARCHAR(100) not null, " +
                "category_name VARCHAR(50) default 'uncategorized', " +
                "price NUMERIC(12, 2) default 0 check (price >= 0)," +
                "store NUMERIC(12,0) default 0 check(store >= 0)," +
                "sold NUMERIC(12,0) default 0 check (sold >= 0)," +
                "image BLOB," +
                "PRIMARY KEY (name)," +
                "FOREIGN KEY (category_name) references categories (name)" +
                "        on update cascade" +
                ");";
            con.query(sql, function (err) {
                    if (err) throw err;
                    console.log("Good table created.");
                }
            );

            sql = "CREATE TABLE orders (" +
                "good_name VARCHAR(100) not null, " +
                "amount NUMERIC(12,0) default 1 check(amount >= 1), " +
                "customer_full_name VARCHAR(255) not null," +
                "address VARCHAR(300) not null," +
                "price NUMERIC(12,2) default 0 check (price >= 0)," +
                "sell_date DATETIME not null on update CURRENT_TIMESTAMP," +
                "code NUMERIC(12,0) not null," +
                "state VARCHAR(100) default 'doing' check (state in ('done', 'cancelled', 'doing'))," +
                "PRIMARY KEY (code)" +
                ");";
            con.query(sql, function (err) {
                    if (err) throw err;
                    console.log("Order tables created.");
                }
            );
            addUser(con, "webAdmin", "AUgEPslVcgf9RI6z");
        }
    });
}


function addUser(con, username, password) {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
           console.log(err);
        } else {
            let sql = "INSERT INTO users (username, password) VALUES (" + "\'" + username + "\'" + ", " + "\'" + con.escape(hash) + "\'" + ");";
            con.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
}


function authentication(con, username, password) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT password FROM users WHERE username = " + "\'" + username + "\'"
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            let check;
            if (result.length > 0) {
                check = result[0].password === password;
            } else {
                addUser(con, username, password);
                check = 'added';
            }
            resolve(check);

        });
    });
}
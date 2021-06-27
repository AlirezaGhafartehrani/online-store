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
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



app.post('/login', function (req, res) {

    authentication(db, req.body.username, req.body.password).then(function (val) {
        let token = val.split("split")[0];
        let message = val.split("split")[1];
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token,
            'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
        });
        res.send(message);
    });


});


app.get('/', isLoggedIn, function (req, res) {

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
    });
    res.send('logged in');
});

app.post('/', isLoggedIn, function (req, res) {

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Type, Allow, Authorization, X-Response-Time'
    });
    res.send('logged in');
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
                "password VARCHAR(100) not null, " +
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
            let sql = "INSERT INTO users (username, password) VALUES (" + "\'" + username + "\'" + ", " + con.escape(hash) + ");";
            con.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
}


function authentication(con, username, password) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT password FROM users WHERE username = " + "\'" + username + "\'";

        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            let message;
            let token;
            if (result.length > 0) {
                // message = result[0].password === password;
                bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        message = 'Username or password is incorrect!'
                        resolve(`${token}split${message}`);
                        throw bErr;
                    }
                    if (bResult) {
                        token = jwt.sign({
                                username: result[0].username,
                            },
                            'SECRETKEY', {
                                expiresIn: '3h'
                            }
                        );
                        message = 'logged in';
                        resolve(`${token}split${message}`);
                    }
                });
            } else {
                addUser(con, username, password);
                message = 'new user added';
                resolve(`${token}split${message}`);
            }

        });

    });
}


function isLoggedIn(req, res, next) {
    try {
        const token = req.get('authorization');
        const decoded = jwt.verify(
            token,
            'SECRETKEY'
        );
        next();
    } catch (err) {
        return res.status(401).send({
            msg: 'Your session is not valid!'
        });
    }
}
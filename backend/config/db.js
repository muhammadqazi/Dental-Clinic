require('dotenv').config()
var mysql = require('mysql');


const _connect_database = () => {

    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log(`Response from ${con.config.database} database is: ${con.state}`);
    });

    return con;
}


module.exports = _connect_database;
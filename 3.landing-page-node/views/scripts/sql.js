var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'landing_page'
});

const insertQuery = (ip) => {

    connection.connect();

    connection.query(`INSERT INTO logs (ip_address) VALUES ('${ip}')`, function (error, results, fields) {
        if (error) throw error;
        console.log("1 record inserted");
    });

    connection.end();
}

module.exports = { insertQuery };
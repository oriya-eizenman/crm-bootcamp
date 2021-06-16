var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'landing_page'
});

const insertQuery = (leadName, leadEmail, leadPhone) => {

    connection.connect();

    connection.query(`INSERT INTO leads (user_name,user_email,user_phone) VALUES ('${leadName}','${leadEmail}','${leadPhone}')`, function (error, results, fields) {
        if (error) throw error;
        console.log("1 record inserted");
    });

    connection.end();

}

module.exports = { insertQuery };
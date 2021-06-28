var mysql = require('mysql');

const mysqlInstance = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'landing_page'
});
mysqlInstance.connect();

module.exports = mysqlInstance;
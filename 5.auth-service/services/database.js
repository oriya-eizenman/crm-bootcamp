var mysql = require('mysql');

const mysqlInstance = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bakery_manager'
});
mysqlInstance.connect();

module.exports = mysqlInstance;
const mysql = require('../../services/database');

const insertQuery = (ip) => {

    try {
        mysql.query(`INSERT INTO logs (ip_address) VALUES ('${ip}')`, function (error, results, fields) {
            if (error) throw error;
        });
    }
    catch (exception) {
        console.error(exception.err);
    }
};

module.exports = { insertQuery };

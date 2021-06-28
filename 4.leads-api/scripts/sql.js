const mysql = require('../services/database');

const insertQuery = (leadName, leadEmail, leadPhone) => {

    try {
        mysql.query(`INSERT INTO leads (user_name,user_email,user_phone) VALUES ('${leadName}','${leadEmail}','${leadPhone}')`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 record inserted");
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const getQuery = (sortBy, order, populateSqlData) => {
    try {
        mysql.query(`SELECT * FROM leads ORDER BY ${sortBy} ${order}`, function (error, results, fields) {
            if (error) throw error;
            return populateSqlData(results);
        });
    }
    catch (exception) {
        console.error(exception.err);
    }
}

module.exports = { getQuery, insertQuery };


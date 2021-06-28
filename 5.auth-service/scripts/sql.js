const mysql = require('../services/database');

const createUser = (userData) => {

    try {
        mysql.query(`INSERT INTO bakery_user (user_name,user_email,user_phone,permission_level,user_password) VALUES ('${userData.userName}','${userData.userEmail}','${userData.userPhone}','manager','${userData.password}')`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 user record inserted");
            mysql.query(`INSERT INTO bakeries (bakery_id,bakery_name,number_of_employees) VALUES ('${results.insertId}','${userData.businessName}','${userData.numOfWorkers}')`, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                console.log("1 bakery record inserted");
            });
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const getUser = (userData, populateLoggedinUserData) => {

    try {
        mysql.query(`SELECT * FROM bakery_user WHERE user_email='${userData.userEmail}' AND user_password='${userData.password}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            return populateLoggedinUserData(results);
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

module.exports = { createUser, getUser };


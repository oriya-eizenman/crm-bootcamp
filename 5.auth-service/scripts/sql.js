const mysql = require('../services/database');

const createUser = (userData) => {

    try {
        mysql.query(`INSERT INTO bakery_user (user_name,user_email,user_phone,permission_level,user_password) VALUES ('${userData.userName}','${userData.userEmail}','${userData.userPhone}','manager','${userData.password}')`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 user record inserted");
            mysql.query(`UPDATE bakery_user SET bakery_id='${results.insertId}' WHERE user_email='${userData.userEmail}'`, function (error, results, fields) {
                console.log(results);
                console.log(fields)
                if (error) {
                    throw error;
                }
            });
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

const isUserExists = (userEmail, populateUser) => {
    try {
        mysql.query(`SELECT * FROM bakery_user WHERE user_email='${userEmail}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            return populateUser(results);
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const updateUserPassword = (userEmail, password) => {
    try {
        mysql.query(`UPDATE bakery_user SET user_password='${password}' WHERE user_email='${userEmail}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 bakery record updated");
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const getBakery = (managerEmail, callback) => {
    try {
        mysql.query(`SELECT bakery_id FROM bakery_user WHERE user_email='${managerEmail}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            return callback(results[0]?.bakery_id);
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const addUser = (userData) => {
    try {
        mysql.query(`INSERT INTO bakery_user (user_name,user_email,user_phone,permission_level,user_password,bakery_id) VALUES ('${userData.userName}','${userData.userEmail}','${userData.userPhone}','employee','${userData.password}','${userData.bakeryId}')`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 user record inserted");
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const geyBakeryEmployees = (bakeryId, populateEmployees) => {
    try {
        mysql.query(`SELECT user_name, user_email, user_phone FROM bakery_user WHERE bakery_id='${bakeryId}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            return populateEmployees(results);
        });
    }
    catch (exception) {
        console.error(exception);
    }
}

const deleteUser = (userEmail) => {
    console.log(userEmail)
    try {
        mysql.query(`DELETE FROM bakery_user WHERE user_email='${userEmail}'`, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log("1 user record deleted");
        })
    }
    catch (exception) {
        console.error(exception);
    }
}

module.exports = { createUser, getUser, isUserExists, updateUserPassword, getBakery, addUser, geyBakeryEmployees, deleteUser };


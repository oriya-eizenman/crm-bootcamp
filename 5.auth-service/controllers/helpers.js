const sql = require('../scripts/sql');
const jwt = require('jsonwebtoken');
const { domain, masterKey, accessTokenSecret } = require('../config');
const config = require('../config');
const md5 = require('md5');
const redis = require("redis");
const publisher = redis.createClient();
const dotenv = require('dotenv');
dotenv.config();

const Enums = {

    "ACCESS_TOKEN_NAME": "access_token"
}

const setCookie = (res, name, value) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
}

const respond = (res, message, status = true, extra_data) => {

    const code = status ? 200 : 500;
    res.status(code).json({ message, ...extra_data });

}

const encrypt = (str, algo = "MD5") => {
    switch (algo) {
        case "MD5":
            return md5(str);
            break;

        default:
            break;
    }
    return str;

}

const makeNewUser = (req, res) => {

    const password = encrypt(req.body.password);
    const userData = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        businessName: req.body.businessName,
        numOfWorkers: req.body.numOfWorkers,
        password: password
    };

    // TODO: add validations
    let isValid = true;

    if (isValid) {
        try {
            sql.createUser(userData);
            const token = jwt.sign({
                userData: {
                    userName: userData.userName,
                    password: userData.password
                }
            }, accessTokenSecret, { expiresIn: '24h' });
            setCookie(Enums.ACCESS_TOKEN_NAME, token);
            respond(res, "Logged in successfully");
        }
        catch (exc) {
            console.error(exc.message);
        }

    }
}

const loginUser = (req, res) => {
    // console.log(req.body)
    const password = encrypt(req.body.password);
    const userData = {
        userEmail: req.body.userEmail,
        password: password
    };

    try {
        sql.getUser(userData, (data) => {
            if (data.length === 0)
                res.send('email or password incorrect');
            else {
                const token = jwt.sign({ userData: data[0] }, accessTokenSecret, { expiresIn: '24h' });
                setCookie(res, "access_token", token);
                respond(res, "Logged in successfully", true, { loggedInUser: data });
            }
        }
        );
    }
    catch (exc) {
        console.error(exc.message);
    }
}

const logoutUser = (res) => {
    res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
}

const sendEmail = async (from, to, subject, text, html, res) => {
    const mailGun = new Mailgun({
        apiKey: config.masterKey,
        domain: config.domain,
    });
    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
    await mailGun.messages().send(data, function (err, body) {
        if (err) {
            console.log("got an error: ", err);
        }
    });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const sendResetPasswordEmail = (req, res) => {
    const userEmail = req.body.userEmail;
    try {

        sql.isUserExists(userEmail, (data) => {
            if (data.length === 0) {
                res.send(false);
            }
            else {
                const token = jwt.sign({ userEmail: userEmail }, accessTokenSecret, { expiresIn: '0.5h' });
                sendEmail(
                    "oriya.eizenman@workiz.com",
                    userEmail,
                    "Reset your password to PIE-CHART",
                    "Hi! Please enter the link to reset your password:",
                    `http://localhost:3000/reset-password/${token}`,
                    res
                )
            }
        });
    }
    catch (exc) {
        console.error(exc.message);
    }
}

const resetPassword = (req, res) => {
    jwt.verify(req.body.userEmail, accessTokenSecret, (err, result) => {
        if (err) {
            res.send(false);
        }
        else {
            const userEmail = result.userEmail;
            const password = (md5(req.body.password));
            try {
                sql.isUserExists(userEmail, (data) => {
                    if (data.length === 0)
                        res.send('email does not exists');
                    else {
                        sql.updateUserPassword(userEmail, password);
                        res.send('password updated')
                    }
                }
                );
            }
            catch (exc) {
                console.error(exc.message);
            }
        }
    });
}

const sendAddUserEmail = (req, res) => {
    const managerEmail = req.body.managerEmail;
    const userEmail = req.body.userEmail;
    try {
        sql.getBakery(managerEmail, (bakeryId) => {
            const token = jwt.sign({ userEmail: userEmail, bakeryId: bakeryId }, accessTokenSecret, { expiresIn: '24h' });
            sendEmail(
                "oriya.eizenman@workiz.com",
                userEmail,
                "Sign up to PIE-CHART",
                "Hi! Please enter the link to sign up to PIE-CHART:",
                `http://localhost:3000/user-signup/${token}`,
                res
            )
        });


    }
    catch (exc) {
        console.error(exc.message);
    }
}

const sendEmailToMailingList = (req, res) => {
    const userData = req.userData;
    const mailingList = req.body.mailingList;
    const mailData = {
        sender: userData.user_email,
        recipients: mailingList,
        title: "test",
        content: "test",
    }
    publisher.publish("mailingList", JSON.stringify(mailData), function () {
        res.sendStatus(200);
    });
}

const addUser = (req, res) => {
    jwt.verify(req.body.userData, accessTokenSecret, (err, result) => {
        if (err) {
            res.send(false);
        }
        else {
            const userData = {
                userName: req.body.userName,
                userEmail: result.userEmail,
                userPhone: req.body.userPhone,
                password: (md5(req.body.password)),
                bakeryId: result.bakeryId
            };
            try {
                sql.addUser(userData);
                res.status(200);
            }
            catch (exc) {
                console.error(exc.message);
            }
        }
    });
}

const sendBakeryEmployees = (req, res) => {
    const managerEmail = req.body.managerEmail;
    try {
        sql.getBakery(managerEmail, (bakeryId) => {
            sql.geyBakeryEmployees(bakeryId, (results) => {
                res.send(results)
            });
        })
    }
    catch (exc) {
        console.error(exc.message);
    }
}

const deleteUser = (req, res) => {
    const userEmail = req.body.userEmail;
    console.log(userEmail)
    try {
        sql.deleteUser(userEmail);
        res.status(200);
    }
    catch (exc) {
        console.error(exc.message);
    }
}

module.exports = {
    makeNewUser,
    loginUser,
    logoutUser,
    sendResetPasswordEmail,
    resetPassword,
    sendAddUserEmail,
    addUser,
    sendBakeryEmployees,
    deleteUser,
    sendEmailToMailingList,
    sendEmail
};
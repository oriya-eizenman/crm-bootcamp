const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config');

const skipRequests = ["/login", "/logout", "/signup", "/forgotPassword", "/resetPassword", "/userSignup"];

function checkToken(req, res, next) {
    if (skipRequests.includes(req.originalUrl))
        return next();

    const token = req.cookies.access_token;
    if (!token) {
        return res.send(null)
    }
    try {
        const data = jwt.verify(token, accessTokenSecret);
        req.userData = data.userData;
        return next();
    } catch {
        return res.sendStatus(403);
    }
}

module.exports = checkToken;
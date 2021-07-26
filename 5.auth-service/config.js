// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    domain: process.env.DOMAIN,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    accessTokenSecret: process.env.SECRET
};

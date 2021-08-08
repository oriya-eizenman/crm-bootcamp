const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '1 818 572 9816',
        to: '+972548090534'
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
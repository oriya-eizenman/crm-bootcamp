var redis = require("redis");
var subscriber = redis.createClient();
var { sendEmail } = require('./controllers/helpers');

subscriber.on("message", async function (channel, mailData) {
    const mail = JSON.parse(mailData);
    try {
        mail.recipients.forEach(async (recipient) => {
            await sendEmail(mail.sender, recipient.client_email, mail.title, mail.content)
            console.log('email was sent')
        });
    }
    catch (err) {
        console.log('error', err)
    }
});
subscriber.subscribe("mailingList");
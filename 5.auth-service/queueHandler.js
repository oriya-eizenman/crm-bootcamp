var redis = require("redis");
var subscriber = redis.createClient();
var { sendEmail } = require('./controllers/helpers');
const { Server } = require("socket.io");
// const io = new Server(server);

subscriber.on("message", async function (channel, mailData) {
    const mail = JSON.parse(mailData);
    try {
        mail.recipients.forEach(async (recipient) => {
            await sendEmail(mail.sender, recipient.client_email, mail.title, mail.content)
            console.log('email was sent')
            // io.on('connection', (socket) => {
            //     socket.emit('sent', recipient.client_email)
            // })
        });
    }
    catch (err) {
        console.log('error', err)
    }
});
subscriber.subscribe("mailingList");
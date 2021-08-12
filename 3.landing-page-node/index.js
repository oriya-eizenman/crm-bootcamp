const axios = require('axios');
const express = require('express');
const app = express();
const router = express.Router();
const mustacheExpress = require('mustache-express');
const sql = require('./views/scripts/sql');
const mysql = require('./services/database');

app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.use('/', router);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/admin', function (req, res) {
  const hour = new Date().getHours();
  const isNight = false;//hour >= 19 || hour <= 6;
  const bgColor = isNight ? "black" : "rgba(236, 228, 228, 0.925)";
  const textColor = isNight ? "rgba(236, 228, 228, 0.925)" : "black";
  const footerBgColor = isNight ? "rgba(231, 213, 213, 0.925)" : "rgba(75, 72, 72, 0.925)";
  const footerTextColor = isNight ? "black" : "white";

  const data = {
    title: "Oogie's Bakery",
    bgColor: bgColor,
    textColor: textColor,
    footerBgColor: footerBgColor,
    footerTextColor: footerTextColor,
    footerAddress: "Pastry Road 7, Muffin Land",
    footerTel: "+972 12345678",
    footerEmail: "info@oogiebakery.com",
  }

  res.render('adminPage', data);
})

app.get('/', function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  sql.insertQuery(ip);

  const video = req.query.video || "pastry";

  const hour = new Date().getHours();
  const isNight = false;//hour >= 19 || hour <= 6;
  const bgColor = isNight ? "black" : "rgba(236, 228, 228, 0.925)";
  const textColor = isNight ? "rgba(236, 228, 228, 0.925)" : "black";
  const footerBgColor = isNight ? "rgba(231, 213, 213, 0.925)" : "rgba(75, 72, 72, 0.925)";
  const footerTextColor = isNight ? "black" : "white";
  const inputs = [
    createFormElement("text", "inputName", "input", "Full Name", "clearInputName()", "required", "invalidName", "name"),
    createFormElement("text", "inputEmail", "input", "Email", "clearInputEmail()", "required", "invalidEmail", "email"),
    createFormElement("text", "inputPhone", "input", "Phone Number", "clearInputPhone()", "required", "invalidPhone", "phone number")
  ]

  const data = {
    title: "Oogie's Bakery",
    aboutContent: "OOGIE'S BAKERY was founded upon a passion for baking and food. The bakery is a one-stop shop for all kind of baked goods and desserts, including breads, challahs, croissant, yeast and cream cakes and personal desserts. Each pastry is made by hand and with a lot of love.",
    aboutLowerHeader: "Visit us in our store!",
    formHeader: "Leave your contact information now and get 10% off your first order!",
    bgColor: bgColor,
    textColor: textColor,
    footerBgColor: footerBgColor,
    footerTextColor: footerTextColor,
    video: video,
    footerAddress: "Pastry Road 7, Muffin Land",
    footerTel: "+972 12345678",
    footerEmail: "info@oogiebakery.com",
    inputs: inputs,
    submitBtnText: "Send!"
  }

  res.render('landingPage', data);
});

app.listen(8080, () => {
  console.log(`Server running at http://localhost:8080/`);
});


function exitHandler(options, exitCode) {
  if (options.exit) process.exit();
  mysql.end();

}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

function createFormElement(type, id, className, placeholder, onClick, required, inputErrorMsg, inputErrorContent) {
  return {
    type: type,
    id: id,
    class: className,
    placeholder: placeholder,
    action: onClick,
    required: required || "",
    inputErrorMsg: inputErrorMsg,
    inputErrorContent: inputErrorContent
  }
}
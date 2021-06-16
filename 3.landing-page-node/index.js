const express = require('express');
const app = express();
const router = express.Router();
const mustacheExpress = require('mustache-express');
const sql = require('./views/scripts/sql');


app.engine('html', mustacheExpress());
app.use(express.static('views'));
app.use('/', router);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  sql.insertQuery(ip);

  const video = req.query.video || "pastry";

  const hour = new Date().getHours();
  const isNight = hour >= 19 || hour <= 6;
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
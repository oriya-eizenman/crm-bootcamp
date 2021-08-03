const express = require('express');
const app = express();
const { port } = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const middlewares = require('./controllers/middlewares');
const helpers = require('./controllers/helpers');

app.use(cors({ credentials: true, origin: "http://localhost:3000", exposedHeaders: ["set-cookie"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(middlewares);

app.post('/registred', function (req, res) {
  res.json(req.userData);
})

app.post('/signup', function (req, res) {
  helpers.makeNewUser(req, res);
});

app.post('/login', function (req, res) {
  helpers.loginUser(req, res);
});

app.get("/logout", (req, res) => {
  helpers.logoutUser(res);
});

app.post("/forgotPassword", (req, res) => {
  helpers.sendResetPasswordEmail(req, res);
});

app.post("/resetPassword", (req, res) => {
  helpers.resetPassword(req, res);
});

app.post("/addUser", (req, res) => {
  helpers.sendAddUserEmail(req, res);
});

app.post("/userSignup", (req, res) => {
  helpers.addUser(req, res);
});

app.post("/bakeryEmployees", (req, res) => {
  helpers.sendBakeryEmployees(req, res);
});

app.post("/deleteUser", (req, res) => {
  console.log('here')
  helpers.deleteUser(req, res);
});

app.get('/', function (req, res) {
  res.send('hello there');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




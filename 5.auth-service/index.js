const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('./scripts/sql');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const accessTokenSecret = 'secretsecretsecret';
// const api_key = '1f1bd6a9-365c56ab';
// const domain = 'oriya.workiz.dev';
// const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

app.use(cors({ credentials: true, origin: "http://localhost:3000", exposedHeaders: ["set-cookie"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const data = {
  from: 'Excited User <oriya.eizenman@workiz.com>',
  to: 'oriya.eizenman@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

app.use((req, res, next) => {
  if (req.originalUrl === "/login" || req.originalUrl === "/logout" || req.originalUrl === "/signup") {
    return next();
  }
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
});

app.post('/registred', function (req, res) {
  res.send(req.userData);
})

app.post('/signup', function (req, res) {
  const password = (md5(req.body.password));
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
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
        .status(200)
        .json({ message: "Logged in successfully" });
    }
    catch (exc) {
      console.error(exc.message);
    }

  }
});

app.post('/login', function (req, res) {
  const password = (md5(req.body.password));
  const userData = {
    userEmail: req.body.userEmail,
    password: password
  };

  // TODO: add validations
  let isValid = true;
  const token = jwt.sign({ userData: userData }, accessTokenSecret, { expiresIn: '24h' });

  if (isValid) {
    try {
      sql.getUser(userData, (data) => {
        if (data.length === 0)
          res.send('email or password incorrect');
        else {
          res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
            .status(200)
            .json({ message: "Logged in successfully" });
        }
      }
      );
    }
    catch (exc) {
      console.error(exc.message);
    }

  }
});

app.get("/logout", (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

app.post("/forgotPassword", (req, res) => {
  // mailgun.messages().send(data, function (error, body) {
  //   console.log(body);
  // });
});

app.get('/', function (req, res) {
  res.send('hello there');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});





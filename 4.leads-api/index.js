const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('./scripts/sql');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('hello there');
});

app.post('/', function (req, res) {
  const leadName = req.body.leadName;
  const leadEmail = req.body.leadEmail;
  const leadPhone = req.body.leadPhone;
  const validation = {
    isNameValid: true,
    isEmailValid: true,
    isPhoneValid: true,
    isSqlSuccessful: true
  };
  let isValid = true;

  if (!isInputNameValid(leadName)) {
    isValid = false;
    validation.isNameValid = false;
  }
  if (!isInputEmailValid(leadEmail)) {
    isValid = false;
    validation.isEmailValid = false;
  }
  if (!isInputPhoneValid(leadPhone)) {
    isValid = false;
    validation.isPhoneValid = false;
  }

  if (isValid) {
    try {
      sql.insertQuery(leadName, leadEmail, leadPhone);
    }
    catch (exc) {
      console.error(exc.message);
      validation.isSqlSuccessful = false;
    }

  }
  res.send(validation);
})

app.post('/leads', function (req, res) {
  const sortBy = req.body.sortBy;
  const order = req.body.order;
  try {
    sql.getQuery(sortBy, order, (data) => {
      res.send(data);
    });
  }
  catch (exc) {
    console.error(exc.message);
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
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

function isInputNameValid(leadName) {
  const reg = /^\w+\s\w+$/;
  return reg.test(leadName) && leadName.length <= 20;
}

function isInputEmailValid(leadEmail) {
  const reg = /^\w+.{0,1}\w+@\w{2,}\.\w{2,}$/;
  return reg.test(leadEmail) && leadEmail.length <= 50;
}

function isInputPhoneValid(leadPhone) {
  const reg = /^0[1-9][0-9]{8}$/;
  return reg.test(leadPhone) && leadPhone.length <= 15;
}
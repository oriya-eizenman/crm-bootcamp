const express = require('express')
const mustacheExpress = require('mustache-express');
const path = require('path')
const morgan = require('morgan');
const chalk = require('chalk');

const app = express()

app.use(express.json())

let format = ':method :url :status - :response-time ms'
if (process.env.NODE_ENV === 'development'){
    format = chalk.magentaBright(format)
}
app.use(morgan(format))

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', path.resolve('src', 'views'));

app.get('/', (req, res) => {
    const data = {
        title: 'Index Page',
        content: 'Welcome to your server-side rendered content! 😎'
    }
    res.render('index', data)
})

app.get('/health', (req, res) => {
    res.sendStatus(200)
})


module.exports = app;

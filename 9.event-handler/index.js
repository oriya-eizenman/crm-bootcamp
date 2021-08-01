const express = require('express');
const app = express();
app.use('/static', express.static('public'))
const http = require('http');
const bodyParser = require('body-parser')
const server = http.createServer(app);


// app.get("/", (req, res) => {
//     res.send('ehl')


// })

server.listen(9000, () => {
    console.log('listening on *:9000');
});
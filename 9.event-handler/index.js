const express = require('express');
const app = express();
app.use('/static', express.static('public'))
const http = require('http');
const bodyParser = require('body-parser')
app.use(bodyParser());
const server = http.createServer(app);
var cors = require('cors');
app.use(cors());
const axios = require('axios');
var redis = require("redis");
var publisher = redis.createClient();


app.post("/saveEvents", async (req, res) => {
    const events = req.body.events;
    if (events && events.length > 0) {
        publisher.publish("events", JSON.stringify(events), function () {
            // process.exit(0);
            res.sendStatus(200);
        });
    }
})

server.listen(9000, () => {
    console.log('listening on *:9000');
});
const elasticsearch = require('elasticsearch');
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

const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    apiVersion: '6.8'
})

app.post("/saveEvents", async (req, res) => {
    const events = req.body.events;
    if (events && events.length > 0) {

        const body = events.flatMap(doc => [{ index: { _index: 'stats' } }, doc])

        try {
            const bulkResponse = await client.bulk({ refresh: true, body, type: "external" });
            if (bulkResponse.errors) {
                const erroredDocuments = []
                bulkResponse.items.forEach((action, i) => {
                    const operation = Object.keys(action)[0]
                    if (action[operation].error) {
                        erroredDocuments.push({
                            status: action[operation].status,
                            error: action[operation].error,
                            operation: body[i * 2],
                            document: body[i * 2 + 1]
                        })
                    }
                })
                console.log('errors', erroredDocuments)
            }
            else {
                console.log("Indexing successful");
            }
        }
        catch (err) {
            console.log('error', err)
        }

    }
    res.status(200).json({ msg: "msg" })


})

server.listen(9000, () => {
    console.log('listening on *:9000');
});
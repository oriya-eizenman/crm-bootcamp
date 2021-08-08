const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    apiVersion: '6.8'
})

var redis = require("redis");
var subscriber = redis.createClient();
subscriber.on("message", async function (channel, eventsData) {
    const events = JSON.parse(eventsData);
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
});
subscriber.subscribe("events");
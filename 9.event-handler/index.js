const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')
const server = http.createServer(app);


app.get("/", (req, res) => {
    res.send('ehl')
    // let stats = [];
    // const handleClick = (event) => {
    //     let tempStats = stats;
    //     temp["click"] = (stats["click"]) ? (stats["click"] + 1) : 1;
    //     setStats(tempStats);
    // }

    // window.addEventListener('click', handleClick, []);

    // const interval = setInterval(() => {
    //     console.log(stats);
    // }, 5000);

    // window.onload(
    //     interval
    // )

})

server.listen(9000, () => {
    console.log('listening on *:9000');
});
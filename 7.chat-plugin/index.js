const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/crm-client', (req, res) => {
    res.sendFile(__dirname + '/crm-client.html');
});

app.get('/lead-client', (req, res) => {
    res.sendFile(__dirname + '/lead-client.html');
});

io.on('connection', (socket) => {

    socket.on('welcome message', (data) => {
        io.emit('welcome message', data.msg)
        socket.join('crm');
    });

    socket.on('admin message', (roomId, msg) => {
        io.in(roomId).emit('admin message', roomId, msg)
    });

    socket.on('lead message', (roomId, msg, isFirstMsg) => {
        if (isFirstMsg) {
            socket.join(roomId)
            io.in('crm').emit('new message', roomId, msg);
        }
        else {
            io.in(roomId).emit('lead message', roomId, msg)
            // io.emit('lead message', msg);
        }
    });

    socket.on('new lead', (leadId, msg) => {
        socket.join(leadId)
        io.in(leadId).emit('lead message', leadId, msg)
        // console.log(io.sockets.adapter.rooms.get(leadId))
    });
});

server.listen(7000, () => {
    console.log('listening on *:7000');
});
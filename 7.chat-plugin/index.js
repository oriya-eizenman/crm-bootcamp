const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser')
const server = http.createServer(app);
const { Server } = require("socket.io");
const chat = require("./controllers/chat.ts");
const io = new Server(server);
const axios = require('axios');
require('dotenv').config()
const services = require('./services/services.ts');
services.InitMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/chat', chat)


app.get('/crm-client', (req, res) => {
    res.sendFile(__dirname + '/crm-client.html');
});

app.get('/lead-client', (req, res) => {
    res.sendFile(__dirname + '/lead-client.html');
});

app.get('/getAllRooms', (req, res) => {
    getAllRooms();
});

app.get('/plugin', (req, res) => {
    res.sendFile(__dirname + '/mychat.js');
});

io.on('connection', (socket) => {

    socket.on('get welcome message', (message, leadId, time) => {
        socket.join(leadId)
        io.in(leadId).emit('admin message', message, time);
    });

    socket.on('lead join to room', (roomId) => {
        socket.join(roomId)
        // io.in(leadId).emit('admin message', message, time);
    });

    socket.on('get all rooms', (accountId) => {
        axios.get(`http://localhost:7000/chat/getAllRooms/${accountId}`)
            .then((res) => {
                res.data.forEach(lead => {
                    socket.join(Number(lead.roomId));
                })
                io.emit('set all rooms', res.data);
            })
            .catch((err) => {
                console.log('error', err);
            })
    });

    socket.on('store message', (leadEmail, message) => {
        axios.put(`http://localhost:7000/chat/storeMessage/${leadEmail}`,
            message
        )
            .then((res) => {
            })
            .catch((err) => {
                console.log('error', err);
            })
    });

    socket.on('send admin message', (message, leadId, time) => {
        io.in(leadId).emit('admin message', message, time);
    })

    socket.on('check for lead', async (leadEmail, roomId) => {
        const res = await axios.get(`http://localhost:7000/chat/getMsgs/${leadEmail}`)
            .catch((err) => {
                console.log(err);
            }
            )
        io.in(roomId).emit('set lead data', res.data);
    })

    socket.on('set room id', (leadEmail, roomId) => {
        axios.put(`http://localhost:7000/chat/updateRoomId/${leadEmail}`, { roomId })
            .then((res) => {

            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
    })


    socket.on('send lead data', (leadName, leadEmail, roomId) => {
        io.in('crm').emit('new message', leadName, leadEmail, roomId);
        axios.post(`http://localhost:7000/chat/`, { leadEmail, leadName, roomId, messages: [] })
            .then((res) => {
                console.log(res)
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        axios.get(`http://localhost:7000/chat/getMsgs/${leadEmail}`)
            .then((res) => {

            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
    })

    socket.on('join room crm', () => {
        socket.join('crm');
    });

    socket.on('admin message', (msg, roomId, leadId, time) => {
        io.in(roomId).emit('admin message', msg, roomId, leadId, time)
    });

    socket.on('lead message', (msg, roomId, leadId, date) => {
        io.in(roomId).emit('lead message', msg, roomId, leadId, date)
    });

    socket.on('lead typing message', (roomId) => {
        io.in(roomId).emit('lead typing message');
    })

    socket.on('lead no longer typing message', (roomId) => {
        io.in(roomId).emit('lead no longer typing message');
    })

    socket.on('new lead', (leadId, msg) => {
        socket.join(leadId)
    });
});

server.listen(7000, () => {
    console.log('listening on *:7000');
});
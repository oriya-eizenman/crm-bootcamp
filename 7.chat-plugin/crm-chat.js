<script src="/socket.io/socket.io.js"></script>

var socket = io();
var typing = false;
var timeout = undefined;
var user;

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typingMsg = document.getElementById('typing');
var rooms = {};
let activatedRoom;

function getAllRooms() {
    console.log('here')
    // return rooms;
}

function test() {
    console.log('test')
}

// socket.emit('welcome message', { msg: "enter your email address" });

window.addEventListener('load', function (e) {
    socket.emit('join room crm');
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        console.log(activatedRoom)
        console.log(rooms)
        socket.emit('admin message', activatedRoom, input.value);
        input.value = '';
    }
});

socket.on('welcome message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('lead message', function (roomId, msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    rooms[roomId].push(msg);
});

socket.on('admin message', function (roomId, msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    rooms[roomId].push(msg);
});

socket.on('new message', function (leadId, msg) {
    socket.emit('new lead', leadId, msg);
    rooms[leadId] = [];
    activatedRoom = leadId;
});
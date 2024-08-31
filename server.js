const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

let users = [];

// Run when a client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    // Add the user to the list
    users.push(socket.id);
    io.emit('userList', users);

    // Broadcast when a user connects
    socket.emit('message', 'Welcome to Chat Room!');
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        users = users.filter(user => user !== socket.id);
        io.emit('message', 'A user has left the chat');
        io.emit('userList', users);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

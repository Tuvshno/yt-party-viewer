// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let videoTime = 0;

io.on('connection', (socket) => {
    // Send the current video time to the new client
    socket.emit('videoTime', videoTime);
    console.log(videoTime)

    // When a client changes the video time, update it for all clients
    socket.on('videoTime', (time) => {
        videoTime = time;
        socket.broadcast.emit('videoTime', time);
    });
});

server.listen(3000, () => console.log('Server listening on port 3000'));

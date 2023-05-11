const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});







// io.on('connection', (socket) => {
//     // Send the current video time to the new client
//     socket.emit('videoTime', videoTime);
//     console.log(videoTime)

//     // When a client changes the video time, update it for all clients
//     socket.on('videoTime', (time) => {
//         videoTime = time;
//         socket.broadcast.emit('videoTime', time);
//     });
// });


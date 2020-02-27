const express = require('express');
const app = express();
const server = app.listen(4000);
const socket = require('socket.io');
app.use(express.static('public'));
const io = socket(server);

io.on('connection', socket => {
  socket.on('chat', data => io.sockets.emit('chat', data));
  socket.on('typing', data => socket.broadcast.emit('typing', data));
});

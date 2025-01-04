const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

// define the socket
const io = new Server(server , {
    cors: {
        origin: '*',
    }
});

// create a connection
io.on('connection', (socket) => {
    console.log('a user connected' , socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected' , socket.id);
    });
  });

module.exports = {
    app,
    server
}
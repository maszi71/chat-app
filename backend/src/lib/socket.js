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

// used to store online user
const userSocketMap = {}

// create a connection
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id
    // io.emit() is used to send events to all the connected clients
    console.log(userSocketMap,'userSocketMap')
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    });
  });

module.exports = {
    app,
    server
}
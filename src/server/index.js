const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = [];
let messages = [];

io.on('connection', (socket) => {
    socket.on('userLogin', (user) => {
        if(users.includes(user) || user === '') {
            io.to(socket.id).emit('rejectedNickname', 'Nome de usuário já cadastrado ou vazio');
            return;
        }
        socket.name = user;
        users.push(user);

        let entryMessage = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            user: `system`,
            message: `${user} entrou na sala.`
        }
        messages.push(entryMessage);

        io.emit('userList', users);
        socket.broadcast.emit('messageReceived', messages);
    });

    socket.on('message', (msg) => {
        messages.push(msg);
        socket.broadcast.emit('messageReceived', messages);
    })

    socket.on('disconnect', () => {
        users = users.filter((user) => user !== socket.name);

        let exitMessage = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            user: `system`,
            message: `${socket.name} saiu na sala.`
        }
        messages.push(exitMessage);

        io.emit('updatedUserList', users);
        socket.broadcast.emit('messageReceived', messages);
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});
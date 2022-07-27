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

let users = []

io.on('connection', (socket) => {
    socket.on('userLogin', (user) => {
        if(users.includes(user) || user === '') {
            socket.emit('rejectedNickname', 'Nome de usuário já cadastrado ou vazio'); 
            return 
        }
        users.push(user);
    });

    socket.emit('userList', users)

    socket.on('message', (msg) => {
        socket.broadcast.emit('messageReceived', msg);
    })

    socket.on("disconnect", () => {
        console.log('algum usuario saiu')
    });
})


server.listen(3000, () => {
    console.log('listening on *:3000');
});
//Node server which will handle socket io connections
const io = require('socket.io')(8000,{cors: {
    origin: '*'
}});

const express = require('express');
const cors = require('cors');
const app = express();


const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', user_name =>{
        
        users[socket.id] = user_name;
        socket.broadcast.emit('user-joined', user_name);
    });

    
    //receive message  
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    
    //disconnect message
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
});

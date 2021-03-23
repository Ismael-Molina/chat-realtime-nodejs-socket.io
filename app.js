const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);

let nombre;
io.on('connection', socket => {
    

    socket.on('conectado', (nomb) => {
        nombre = nomb;
        socket.broadcast.emit("mensajes",{nombre:nombre,mensaje:`${nombre} ha entrado en la sala`});
    });
    socket.on('mensaje', (nombre,mensaje) => {
        io.emit("mensajes",{nombre,mensaje});
    });
    socket.on('disconnect', () => {
       io.emit("mensajes",{server:"servidor",mensaje:`${nombre} ha abandonado la sala`});
    });
});

server.listen(process.env.PORT || 3000,()=>console.log('Corriendo en el puerto 3000'));
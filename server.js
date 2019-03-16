'use strict';
const express = require('express');
const passport = require('passport');
const { router, socketIO, session, port } = require('./app');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
io.use((socket, next) => session(socket.request, {}, next));
socketIO(io, app);

server.listen(port, () => {
    socketIO(io, app);
    console.log(`An application is running on port ${port}...`);
}); 


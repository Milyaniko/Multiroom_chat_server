'use strict';
const express = require('express');
const passport = require('passport');
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
const { router, socketIO, session, port, redisConfig } = require('./app');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const pubClient = redis(redisConfig.port, redisConfig.host, {
    auth_pass: redisConfig.password, 
});
const subClient = redis(redisConfig.port, redisConfig.host, {
    return_buffers: true,
    auth_pass: redisConfig.password, 
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
io.use((socket, next) => session(socket.request, {}, next));
io.set('transports', ['websocket']);
io.adapter(adapter({
    pubClient,
    subClient
}));
socketIO(io, app);

server.listen(port, () => {
    socketIO(io, app);
    console.log(`An application is running on port ${port}...`);
}); 


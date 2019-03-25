'use strict';
const express = require('express');
const passport = require('passport');
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
const morgan = require('morgan');
const { router, socketIO, session, port, redisConfig, logger } = require('./app');
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
app.use(morgan('combined', {
    stream: {
        write: message => logger.log('info', message),
    }
}));
io.use((socket, next) => session(socket.request, {}, next));
io.set('transports', ['websocket']);
io.adapter(adapter({
    pubClient,
    subClient
}));

server.listen(port, () => {
    socketIO(io, app);
    logger.log('info', `An application is running on port ${port}...`);
}); 


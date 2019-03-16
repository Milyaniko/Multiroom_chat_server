'use strict';
const routes = require('./routes');
const session = require('./session');
const config = require('./config');
const auth = require('./auth');
const { socketIO } = require('./services');

module.exports = {
    router: routes(),
    port: config.port,
    auth: auth(),
    socketIO,
    session,
}

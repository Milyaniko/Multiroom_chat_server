'use strict';
const routes = require('./routes');
const session = require('./session');
const config = require('./config');
const auth = require('./auth');
const { socketIO, logger } = require('./services');

module.exports = {
    router: routes(),
    port: config.port,
    redisConfig: config.redis,
    auth: auth(),
    socketIO,
    session,
    logger,
}

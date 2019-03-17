'use strict';
const authentication = require('./authentication');
const socketIO = require('./socketIO');
const logger = require('./logger');

module.exports = {
    authentication,
    socketIO,
    logger,
}
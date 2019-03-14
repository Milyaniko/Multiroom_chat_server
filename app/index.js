'use strict';
const routes = require('./routes');
const session = require('./session');
const config = require('./config');
const auth = require('./auth');

module.exports = {
    router: routes(),
    session: session,
    port: config.port,
    auth: auth(),
}

'use strict';
const routes = require('./routes');
const session = require('./session');
const config = require('./config');


module.exports = {
    router: routes(),
    session: session,
    port: config.port
}

'use strict';
const mongoose = require('mongoose');
const config = require('../config');
const { logger }= require('../services')
const db = mongoose.connection;
const options = {
    useNewUrlParser: true,
};
mongoose.connect(config.dbURI, options);
db.on('error', error => logger.log('error', 'Mongoose connection error: ' + error));
db.once('open', () => console.log('info', 'The connection has been established'));

module.exports = {
    mongoose,
}

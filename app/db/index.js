'use strict';
const config = require('../config');
const mongoose = require('mongoose');
const { logger }= require('../services')
const db = mongoose.connection;
const options = {
    useNewUrlParser: true,
};
mongoose.connect(config.dbURI, options);
db.on('error', error => logger.log('error', 'Mongoose connection error: ' + error));
db.once('open', () => console.log('The connection has been established'));

const userSchema = new mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePicture: String
});

const userModel = mongoose.model('user', userSchema);
module.exports = {
    mongoose,
    userModel
}

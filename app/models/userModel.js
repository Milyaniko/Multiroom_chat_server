'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userAvatar: String
});

module.exports = mongoose.model('User', userSchema);
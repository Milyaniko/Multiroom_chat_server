'use strict'

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomID: String,
	userName: String,
    message: String,
    userAvatar: String,
    userAvatarColor: String
});

module.exports = mongoose.model('Message', messageSchema);
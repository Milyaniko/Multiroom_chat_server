'use strict'

const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomID: String, default: "",
  roomName: String, default: "",
  users: [Object]
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);

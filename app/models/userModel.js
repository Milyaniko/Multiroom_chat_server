'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePicture: String
});

module.exports = mongoose.model('User', userSchema);
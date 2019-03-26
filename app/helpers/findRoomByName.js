'use strict';

module.exports = (rooms, roomName) => rooms.find(room => room.roomName === roomName);
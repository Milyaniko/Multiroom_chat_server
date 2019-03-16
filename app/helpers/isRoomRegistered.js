'use strict';

module.exports = (rooms, room) => rooms.some(roomItem => roomItem.roomName === room.roomName);
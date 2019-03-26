'use strict'

module.exports = (rooms, roomID) => rooms.find(room => room.roomID === roomID);
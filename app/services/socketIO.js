'use strict'
const { chatRoomModel } = require('../models');
const { randomHex, isRoomRegistered } = require('../helpers')

module.exports = (io, app) => {
    app.locals.chatrooms = [];
    const allRooms = app.locals.chatrooms;
    
    io.of('/roomslist').on('connection', (socket) => {
        socket.on('getChatRooms', () => {
            socket.emit('chatRoomsList', JSON.stringify(allRooms))
        })
        socket.on('createNewRoom', (newRoomInput) => {
            if (!isRoomRegistered(allRooms, newRoomInput)) {
                const newRoomId = randomHex();
                allRooms.push(chatRoomModel(newRoomInput, newRoomId, []))
                socket.emit('chatRoomsList', JSON.stringify(allRooms));
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms));
            }
        });
    })
};
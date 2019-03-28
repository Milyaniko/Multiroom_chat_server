'use strict'
const { ChatRoom, Message } = require('../models');
const { 
    randomHex,
    findRoomByName,
    findRoomById,
    addUserToRoom,
    removeUserFromRoom, 
} = require('../helpers')
const { logger } = require('../services');

module.exports = (io, app) => {
    app.locals.chatrooms = [];
    app.locals.messages = [];
    app.locals.typingUsers = {};
    const allRooms = app.locals.chatrooms;
    const typingUsers = app.locals.typingUsers;
    const messages = app.locals.messages;
    
    io.of('/roomslist').on('connection', (socket) => {
        socket.on('getChatRooms', () => {
            ChatRoom.find({}, (err, chatRooms) => {
                if (err) {
                    logger.log('error', err);
                } else {
                    if (allRooms.length === 0) {
                        allRooms.push(...chatRooms);
                    } else {
                        chatRooms.forEach((chatRoom) => {
                           if (!allRooms.some(element => element.roomID === chatRoom.roomID)) {
                               allRooms.push(chatRoom);
                           }});
                      }
                     }
                    socket.emit('chatRoomsList', JSON.stringify(allRooms))
                    socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms))
            });
        });
        socket.on('createNewRoom', (newRoomInput) => {
            const registeredRoom = findRoomByName(allRooms, newRoomInput);
            if (!registeredRoom) {
                const newRoomId = randomHex();
                const newChatRoom = new ChatRoom({
                    roomName: newRoomInput,
                    roomID: newRoomId,
                    users: [],
                });
                newChatRoom.save(err => {
                    if (err) {
                        logger.log('error', err);
                    } else {
                        allRooms.push(newChatRoom);
                        socket.emit('chatRoomsList', JSON.stringify(allRooms));
                        socket.broadcast.emit('chatRoomsList', JSON.stringify(allRooms)); 
                }});
            }
        });
    });

    io.of('/chat/:id').on('connection', (socket) => {
        socket.on('join', data => {
            Message.find({ roomID: data.roomID }, (err, roomMessages) => {
                if(err) {
                    logger.log('error', err);
                } else {
                    messages.push(...roomMessages);
                    socket.emit('updateMessagesList', JSON.stringify(messages));
                }
            });
            const usersList = addUserToRoom(allRooms, data, socket);
            socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
            socket.emit('updateUsersList', JSON.stringify(usersList.users));
        });
        socket.on('disconnect', () => {
            const room = removeUserFromRoom(allRooms, socket);
            if (room) {
                socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
            }
        });
        socket.on('newMessage', (data) => {
            const parsedData = JSON.parse(data);
            const newMessage = new Message(parsedData);
            newMessage.save((err) => {
                if(err) {
                    logger.log('error', err);
                } else {
                    messages[parsedData.roomID] = newMessage;
                    socket.broadcast.to(parsedData.roomID).emit('inMessage', JSON.stringify(newMessage));
                }
            });
        });
        socket.on('startType', (userName, roomID) => {
            typingUsers[userName] = roomID;
            socket.emit('userTypingUpdate', typingUsers, roomID );
            socket.broadcast.emit('userTypingUpdate', typingUsers, roomID);
        });
        socket.on('stopType', (userName) => {
            delete typingUsers[userName];
            socket.emit('userTypingUpdate', typingUsers);
            socket.broadcast.emit('userTypingUpdate', typingUsers);
        });
    });
};
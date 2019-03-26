'use strict';
const findRoomById = require('./findRoomById');

module.exports = (allRooms, data, socket) => {
    const registeredRoom = findRoomById(allRooms, data.roomID);
    if (registeredRoom) {
       const userID =  socket.request.session.passport.user;
       const isUserRegistered = registeredRoom.users.some(user => user.userID === userID);
       if (isUserRegistered) {
            const registeredUserID = registeredRoom.users.indexof(userID);
            registeredRoom.users.splice(registeredUserID, 1);
       } 
       registeredRoom.users.push({
           socketID: socket.id,
           userID,
           userName: data.userName,
           userAvatar: data.userAvatar,
       });
       socket.join(data.roomID);
       return registeredRoom;
    }
}
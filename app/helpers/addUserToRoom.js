'use strict';
const isRoomRegistered = require('./isRoomRegistered');

module.exports = (allRooms, data, socket) => {
    const registeredRoom = isRoomRegistered(allRooms, data.roomName);
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
           userPicture: data.userPicture,
       });
       socket.join(data.roomID);
       return registeredRoom;
    }
}
'use strict';

module.exports = (allRooms, socket) => {
    allRooms.forEach((room) => {
        room.users.find((user) => {
            console.log('user!', user);
            console.log('socketId', socket.id);
            if (user.socketID === socket.id) {
                const userIndex = room.users.indexOf(user.socketID)
                socket.leave(room.roomID)
                room.users.splice(userIndex, 1);
                return room;
            } else {
                return null;
            }
        });
    });
};
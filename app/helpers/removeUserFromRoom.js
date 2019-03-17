'use strict';

module.exports = (allRooms, socket) => {
    allRooms.rooms.array.forEach((room) => {
        room.users.some((user) => {
            if (user.socketID === socket.id) {
                const userIndex = room.users.indexof(user.socketID)
                socket.leave(room.roomID)
                room.users.splice(userIndex, 1);
                return room;
            } else {
                return null;
            }
        });
    });
};
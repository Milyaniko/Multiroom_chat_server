'use strict';

const { User } = require('../models');

class Authentication {
    //check if the user is authenticated
    isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) next();
        else res.redirect('/');
    };
    // Create a new user and return it's instance
    createUser(profile) { 
        return new Promise((resolve, reject) => {
            const newUser = new User({
                userId: profile.id,
                userName: profile.displayName,
                userAvatar: profile.photos[0].value || ""
            });
            newUser.save(error => {
                if(error) reject(error);
                else resolve(newUser);
            })
    });
}
    // Find a user by key
    findUser(userId) {
        return User.findOne({
            "userId": userId
        });
    };
    // Find a user by ID from session
    findById(id) {
         return new Promise((resolve, reject) => {
         User.findById(id, (error, user) => {
            if(error) reject(error);
            else resolve(user);
            })
        });
    };
};

module.exports = new Authentication();
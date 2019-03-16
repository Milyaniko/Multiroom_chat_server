'use strict';
const db = require('../db');

class Authentication {
    //check if the user is authenticated
    isAuthenticated(req, res, next) {
        if(req.isAuthenticated()) next();
        else res.redirect('/');
    };
    // Create a new user and return it's instance
    createUser(profile) { 
        return new Promise((resolve, reject) => {
            const newUser = db.userModel({
                profileId: profile.id,
                fullName: profile.displayName,
                profilePicture: profile.photos[0].value || ""
            });
            newUser.save(error => {
                if(error) reject(error);
                else resolve(newUser);
                console.log('create user');
            })
    });
}
    // Find a user by key
    findUser(profileId) {
        return db.userModel.findOne({
            "profileId": profileId
        });
    };
    // Find a user by ID from session
    findById(id) {
         return new Promise((resolve, reject) => {
         db.userModel.findById(id, (error, user) => {
            if(error) reject(error);
            else resolve(user);
            })
        });
    };
};

module.exports = new Authentication();
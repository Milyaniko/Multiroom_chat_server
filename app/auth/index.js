'use strict';
const passport = require('passport');
const config = require('../config');
const helpers = require('../helpers');
const facebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializerUser((user, done) => {
        done(null, user.id);
    });

    passport.deserealizeUser((id, done) => {
        helpers.findById(id)
        .then(user => done(null, user))
        .catch(error => console.log(`Deserealizing of a user failded: ${error}`));
    });

    const authProcessor = (accesToken, refreshToken, profile, done) => {
        helpers.findUser(profile.id).then(result => {
            if(result) done(null, result);
            else {
                helpers.createUser(profile)
                .then(newUser => done(null, newUser))
                .catch(error => console.log(`Creating of a user failded: ${error}`))
            }
        });
    }
    passport.use(new facebookStrategy(config.fb, authProcessor))
}
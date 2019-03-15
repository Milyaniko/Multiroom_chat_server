'use strict';
const passport = require('passport');
const config = require('../config');
const { authentication } = require('../services');
const facebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        authentication.findById(id)
        .then(user => done(null, user))
        .catch(error => console.log(`Deserealizing of a user failded: ${error}`));
    });

    const authProcessor = (accesToken, refreshToken, profile, done) => {
        authentication.findUser(profile.id).then(result => {
            if(result) done(null, result);
            else {
                authentication.createUser(profile)
                .then(newUser => done(null, newUser))
                .catch(error => console.log(`Creating of a user failded: ${error}`))
            }
        });
    }
    passport.use(new facebookStrategy(config.fb, authProcessor))
}
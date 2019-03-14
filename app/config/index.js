'use strict';
if(process.env.NODE_ENV === 'production') {
    module.exports = {
        port: process.env.PORT || 3000,
        host: process.env.HOST || "",
        dbURI: process.env.DB_URI,
        sessionSecret: process.env.SECRET,
        fb: {
        "clientID": process.env.fbClientID,
        "clientSecret": process.env.fbClientSecret,
        "callbackURL": process.env.localhost + "/auth/facebook/callback",
        "profileFields": ["id", "displayName", "photos"]
        },
    }
} else {
    module.exports = require('./development.json')
}
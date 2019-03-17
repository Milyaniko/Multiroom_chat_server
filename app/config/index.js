'use strict';
if(process.env.NODE_ENV === 'production') {
    const redisURI = require('url').parse(process.env.REDIS_URL);
    const redisPassword = redisURI.auth.split(':')[1];
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
        redis: {
            host: redisURI.host,
            port: redisURI.port,
            password: redisPassword
        }
    }
} else {
    module.exports = require('./development.json')
}
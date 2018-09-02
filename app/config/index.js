'use strict';
if(process.env.NODE_ENV === 'production') {
    module.exports = {
        port: process.env.PORT || 3000,
        host: process.env.HOST || "",
        dbURI: process.env.DB_URI,
        sessionSecret: process.env.SECRET
    }
} else {
    module.exports = require('./development.json')
}
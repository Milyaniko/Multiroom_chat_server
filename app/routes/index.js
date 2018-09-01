'use strict';
const routeHandler = require('../helpers');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res, next) => res.render('login'),
            '/rooms': (req, res, next) => res.render('rooms'),
            '/chat': (req, res, next) => res.render('chatRoom')
        },
        'post': {},
        'NA': (req, res, next) => res.status(404).sendFile(process.cwd() + '/views/404.ejs')
    }
    return routeHandler(routes)
}
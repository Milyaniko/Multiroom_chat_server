'use strict';
const helpers = require('../helpers');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res, next) => res.render('login'),
            '/rooms': (req, res, next) => res.render('rooms'),
            '/chat': (req, res, next) => res.render('chatRoom'),
        },
        'post': {},
        'NA': (req, res, next) => res.status(404).render(process.cwd() + '/views/404.ejs')
    }
    return helpers.route(routes)
}
'use strict';

const helpers = require('../helpers');
const passport = require('passport');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res, next) => res.render('login'),
            '/rooms': (req, res, next) => res.render('rooms', { user: req.user }),
            '/chat': (req, res, next) => res.render('chatRoom'),
            '/logout': (req, res, next) => {
                req.logout(); 
                res.redirect('/');
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                'successRedirect': '/rooms',
                'failureRedirect': '/',
            })
        },
        'post': {},
        'NA': (req, res, next) => res.status(404).render(process.cwd() + '/views/404.ejs')
    }
    return helpers.route(routes)
}
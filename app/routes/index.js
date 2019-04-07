'use strict';

const { route, findRoomById } = require('../helpers');
const { authentication } = require('../services');
const config = require('../config');
const passport = require('passport');

module.exports = () => {
    const routes = {
        'get': {
            '/': (req, res) => res.render('login'),
            '/rooms': [authentication.isAuthenticated, (req, res) => res.render('rooms', { 
                        user: req.user, 
                        host: config.host
                     })],
            '/chat/:id':[authentication.isAuthenticated, (req, res, next) => {
                const registeredRoom = findRoomById(req.app.locals.chatrooms, req.params.id)
                if (!registeredRoom) {
                    next();
                } else {
                    res.render('chatRoom', {
                        user: req.user,
                        host: config.host,
                        roomName: registeredRoom.roomName,
                        roomID: registeredRoom.roomID,
                    });
                }
            }],
            '/logout': (req, res) => {
                req.logout(); 
                res.redirect('/');
            },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                'successRedirect': '/rooms',
                'failureRedirect': '/',
            }),
        },
        'post': {},
        'NA': (req, res) => res.status(404).render('404'),
    }
    return route(routes)
}
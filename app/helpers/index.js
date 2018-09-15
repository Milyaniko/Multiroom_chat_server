'use strict';
const router = require('express').Router();
const db = require('../db');

// Handle and mount the routes
const _routeHandler = (routes, method) => {
    for (let key in routes) {
        const isObject = typeof routes[key] === 'object';
        const isNull = routes[key] === 'null';
        const isArray = routes[key] instanceof Array;
        if (isObject && !isNull && !isArray) {
            _routeHandler(routes[key], key);
        } else {
            if(method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
                router.use(routes[key]);
            }
        }
    }
};

// Pass the routes to the handler
const route = (routes) => {
    _routeHandler(routes);
    return router;
};

// Find a user by key
const findUser = profileID => db.userModel.findOne({
    "profileID": profileID
});

// Create a new user and return it's instance
const createUser = profile => new Promise((respond, reject) => {
    const newUser = db.userModel({
        profileID: profile.id,
        fullName: profile.displayName,
        profilePicture: profile.photos[0].value || ""
    });
    newUser.save(error => {
        if(error) reject(error);
        else resolve(newUser);
    })
});

// Find a user by ID from session
const findById = id => new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
        if(error) reject(error);
        else resolve(user);
    })
});

module.exports = {
    route,
    findUser,
    createUser,
    findById
}
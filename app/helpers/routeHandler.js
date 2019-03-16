'use strict';
const router = require('express').Router();

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

module.exports = (routes) => {
    _routeHandler(routes);
    return router;
};
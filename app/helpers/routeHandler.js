'use strict';
const router = require('express').Router();

const _routeHandler = (routes, method) => {
    for (let key in routes) {
        const isObject = typeof routes[key] === 'object';
        const isNull = routes[key] === 'null';
        const isArray = routes[key] instanceof Array;
        if (isObject && !isNull && !isArray) {
            _routeHandler(routes[key], key);
        } else {
            switch (method) {
                case 'get':
                    router.get(key, routes[key]);
                case 'post':
                    router.post(key, routes[key]);
                default:
                    router.use(routes[key]);
            }
        }
    }
}

const route = (routes) => {
    _routeHandler(routes);
    return router;
};

module.export = {
    route
}
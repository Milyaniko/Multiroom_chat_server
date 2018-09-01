'use strict';
const router = require('express').Router();
const routes = require('./routes');

router.use('/', (req, res, next) => {
    res.render('login');
})

module.exports = {
    router: router
}

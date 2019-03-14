'use strict';
const express = require('express');
const passpot = require('passport');
const socket = require('socket.io');
const appConfig = require('./app');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(appConfig.session);
app.use(passpot.initialize());
app.use(passpot.session());
app.use(appConfig.router);

app.listen(appConfig.port, () => console.log(`An application is running on port ${appConfig.port}...`));


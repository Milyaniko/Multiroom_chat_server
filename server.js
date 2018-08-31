'use strict';
const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => console.log(`An application is running on port ${app.get('port')}...`));


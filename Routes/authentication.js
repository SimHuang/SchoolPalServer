const express = require('express');
const app = express.Router();

//logic for routers
const Authentication = require('../controllers/authentication.js');

app.get('/signin', Authentication.signin);
app.get('/signup', Authentication.signup);
app.get('/signout', Authentication.signout);

module.exports = app;

const express = require('express');
const app = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');


//logic for routers
const Authentication = require('../controllers/authentication.js');

const requireSignin = passport.authenticate('local', {session: false});

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);
app.post('/signout', Authentication.signout);

module.exports = app;

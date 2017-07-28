const express = require('express');
const app = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');

//logic for routers
const Authentication = require('../controllers/authentication.js');

const requireSignin = passport.authenticate('local', {session: false}); //execute requireSignIn before token is returned
const requireAuth = passport.authenticate('jwt', {session:false});

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);

module.exports = app;

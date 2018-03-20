const express = require('express');
const app = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');

const Authentication = require('../controllers/authentication.js');

const requireSignin = passport.authenticate('local', {session: false}); //execute requireSignIn before token is returned
const requireAuth = passport.authenticate('jwt', {session:false});

/* All route URLs for authentication */
app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);

module.exports = app;

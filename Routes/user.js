const express = require('express');
const app = express.Router();
const user = require('../controllers/user.js');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false});


app.get('/user/profile', requireAuth, user.getUserProfile);

module.exports = app;
const express = require('express');
const app = express.Router();
const user = require('../controllers/user.js');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false});

/* All URLs that related to specific user */
app.get('/user/profile', requireAuth, user.getUserProfile); 

module.exports = app;
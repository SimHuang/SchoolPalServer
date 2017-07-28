const express = require('express');
const app = express.Router();
const passport = require('passport');

const Post = require('../controllers/post.js');

const requireAuth = passport.authenticate('jwt', { session: false});

app.post('/post/new', requireAuth, Post.newPost);
app.post('/post/:id', requireAuth, Post.getPost);
app.post('/post/search', Post.getAllPost);

module.exports = app;
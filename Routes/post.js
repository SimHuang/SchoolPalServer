const express = require('express');
const app = express.Router();
const passport = require('passport');

const Post = require('../controllers/post.js');

const requireAuth = passport.authenticate('jwt', { session: false});

app.post('/post/new', requireAuth, Post.newPost);
app.post('/post/search', Post.getAllPosts);
app.post('/post/:id', requireAuth, Post.getPost);

module.exports = app;
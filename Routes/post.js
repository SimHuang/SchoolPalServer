const express = require('express');
const app = express.Router();

const Post = require('../controllers/post.js');

app.post('/post/new', Post.newPost);
app.post('/post/:id', Post.getPost);
app.post('/post/search', Post.getAllPost);

module.exports = app;
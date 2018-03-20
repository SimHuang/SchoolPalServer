const express = require('express');
const app = express.Router();
const passport = require('passport');

const postMeta = require('../controllers/postMeta.js');

const requireAuth = passport.authenticate('jwt', {session:false});

/* All route URLs which is related to a post metadata */
app.put('/post/meta/:id/upvote', postMeta.upvotePost);
app.get('/post/meta/:id/upvote', postMeta.getPostUpvoteCount);
app.put('/post/meta/:id/answers', postMeta.increasePostAnswerCount);
app.get('/post/meta/:id/answers', postMeta.getPostAnswerCount);

module.exports = app;
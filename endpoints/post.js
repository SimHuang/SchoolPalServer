const express = require("express");
const app = express.Router();
const passport = require("passport");

const Post = require("../controllers/post.js");

const requireAuth = passport.authenticate("jwt", { session: false});

/* All route URLs that deal with post manipulation */
app.post("/post/new", requireAuth, Post.newPost);
app.post("/post/search", Post.getAllPosts);
app.get("/post/:id", requireAuth, Post.getPost);
app.post("/post/answer", requireAuth, Post.responseToPost);

module.exports = app;
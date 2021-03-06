const express = require("express");
const app = express.Router();
const user = require("../controllers/user.js");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false});

/* All URLs that related to specific user */
app.get("/user/profile", requireAuth, user.getUserProfile); 
app.put("/user/profile", requireAuth, user.updateUserProfile);
app.get("/user/upvotes", requireAuth, user.getUserUpvotes);

module.exports = app;
const http = require("http");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.Promise = global.Promise;  //using native es6 promises
mongoose.connect("mongodb://localhost:27017/schoolpal");

const authentication = require("./endpoints/authentication");
const post = require("./endpoints/post");
const user = require("./endpoints/user");
const postMeta = require("./endpoints/postMeta.js");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({type: "*/*"}));

//enable CORS
app.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

//routes
app.use("/api/v1", authentication); 
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", postMeta);
 
/**
 * This middleware gets called if http request does not match any middleware from earlier
 */
app.use(function(req, res) {
	res.status(404).render("404");
});

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
	console.log("SchoolPal Server listening on port 3000...");
});
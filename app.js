const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/schoolpal");

const authentication = require('./Routes/authentication');
const post = require('./Routes/post');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({type: '*/*'}));

app.get('/', function(req, res) {
    res.send({ping:'pong'});
});

//routes
app.use('/api/v1', authentication); 

/**
 * This middleware gets called if http request does not match any middleware from earlier
 */
app.use(function(req, res) {
    res.status(404).render('404');
})

const port = process.env.PORT || 3000;
http.createServer(app).listen(port, function() {
    console.log('SchoolPal Server listening on port 3000...');
});
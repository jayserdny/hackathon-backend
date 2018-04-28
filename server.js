const express = require('express');
const server = express();
const assert = require('assert');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var router = express.Router(); // create router for REST routes

// Server passport configuration
server.use(require('express-session')({
    secret: 'cb02bc565faa20f5b62a4cc2059204b1d803477f',
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.urlencoded({
    extended: true
}));


// Register routes for the api
server.use('/api', router);

// Connect to mongodb first and then run the server. Otherwise, catch the error
mongoose.connect('mongodb://localhost:27017/hackathon').then(() => {

    server.get('/', (req, res) => {
        res.send('Connected successfully to server');
    });

    server.listen(2008);

}).catch(err => console.log(err));
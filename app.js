"use strict";

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database Routes
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017", {native_parser:true});

/* BELOW will be the name of your routes file
 * which interacts with MongoDB.
 * name it whatever you want */

var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* --- Make db accessible to our router ---*/
app.use(function(req,res,next){
    req.db = db;
    next();
});

/* BELOW is so that your router can access
 *your database routes file.
 *My routes file is 'routes/rendermarkdown.js'*/
app.use('/', routes);

/// catch 405 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

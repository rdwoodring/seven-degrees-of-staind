// var express = require('express');
// var path = require(
//     'path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var querystring = require('querystring');

// var routes = require('./routes/index');
// var login = require('./routes/login');
// var api = require('./routes/api');

// var app = express();

// require('dotenv').config();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import session from 'express-session';
import connectMongo from 'connect-mongo';

import connect from './database/connect';

import tokenRefresher from './middleware/token-refreshers/tokenRefresher';

import main from './routes/index';
import login from './routes/login';
import api from './routes/api';

dotenv.config();

const app = express(),
    MongoStore = connectMongo(session),
    sessionSecret = process.env.SESSION_SECRET,
    dbConnectionString = process.env.DB_CONN_STRING;

if (!sessionSecret) {
    throw new Error('Session secret was not provided. Make sure that the app is started with a SESSION_SECRET environment variable or with a SESSION_SECRET key in your .env file.');
}

if (!dbConnectionString) {
    throw new Error('DB connection string was not provided. Make sure that the app is started with a DB_CONN_STRING environment variable or with a DB_CONN_STRING key in your .env file.');
}

connect(dbConnectionString);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbConnectionString
    })
}));


app.use(tokenRefresher);

app.use(express.static(path.join(__dirname, '../../public')));

app.use(login);
app.use(api);
app.use(main);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500)
//       .json({
//         message: err.message,
//         error: err
//       });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500)
//     .send();
// });


// module.exports = app;
export default app;
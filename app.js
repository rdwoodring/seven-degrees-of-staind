var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var api = require('./routes/api');

var app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('*', function(req, res, next) {
//   // console.log('hooray, called my extra middleware');
//     var accessTokenExpiry = parseInt(req.cookies.accessTokenExpiry),
//         refreshToken = req.cookies.refreshToken;

//     console.log(Date.now() >= accessTokenExpiry);

//     if (req.path.indexOf('login') < 0 && accessTokenExpiry && Date.now() >= accessTokenExpiry) {
//         // refresh dat access token
//         res.redirect('/login/refresh_token?' +
//             querystring.stringify({
//                 refresh_token: refreshToken
//             }));
//     }

//     next();
// })

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

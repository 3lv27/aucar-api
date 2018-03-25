'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

//helpers
const configurePassport = require('./helpers/passport');
const response = require('./helpers/response');

//routes
const index = require('./routes/index')
const users = require('./routes/users')
const auth = require('./routes/auth')

const app = express()

// database config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/aucar', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// session config
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// passpport config
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', index)
app.use('/users', users)
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res) {
  return response.notFound(req, res);
});

// error handler
app.use(function(err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send response if the error ocurred before sending the response
  if (!res.headersSent) {
    return response.unexpectedError(req, res);
  };
});

module.exports = app

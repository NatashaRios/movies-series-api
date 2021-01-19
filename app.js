const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');

const sessionMiddleware = session({
  name: 'movies-series-api',
  secret: 's3cr3et k3y',
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: 'none',
    secure: true
  }
});

const app = express();

app.use(
  require('cors')({
    origin: function (origin, callback){
      callback(null, origin);
    },
    credentials: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

module.exports = app;

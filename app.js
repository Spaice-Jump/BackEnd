var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
const config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const LoginController = require('./controller/loginController');

var app = express();

app.use(cors(
    config.application.cors.server
  ));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const loginController = new LoginController();

/**
 * Rutas del API 
 */
app.use('/api/v1',require('./routes/api/user'));
app.post("/api/authenticate", loginController.Authenticate);

//rutas sitio web

app.get('/login', loginController.index);
app.post('/login', loginController.Authenticate);


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

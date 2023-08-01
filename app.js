var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const config = require('./config');
require('dotenv').config()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./lib/connectMongoose');

var app = express();

app.use(cors(config.application.cors.server));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Rutas del API
 */
app.use('/api/v1', require('./routes/api/user'));



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    



    // Retrun error API signup
  if (req.originalUrl.startsWith('/api/v1/signup')){
    if (err.array){
        const errorInfo = err.errors[0];
        err.message = `${errorInfo.msg} `  
        err.status = 400 
      }

    
    res.json(err);
    
    return;
  }


    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

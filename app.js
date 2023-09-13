var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
const config = require('./config');

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const LoginController = require('./controller/loginController');
const PasswordController= require('./controller/passwordController')
const UpdateUserController= require('./controller/updateUserController')


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

const loginController = new LoginController();
const passwordController = new PasswordController()
const updateUserController= new UpdateUserController()

/**
 * Rutas del API
 */

app.use('/api/v1',require('./routes/api/user'));
app.post("/api/authenticate", loginController.postAPI);
app.use('/api/travels', require('./routes/api/travels'));
app.use('/api/locations', require('./routes/api/locations'));
app.use('/api/deleteUser',jwtAuthMiddleware,require('./routes/api/deleteUser'));
app.use('/api/jwtWeb',require('./routes/api/jwtWeb'));
app.use('/api/favorites',jwtAuthMiddleware, require('./routes/api/favorites'));



//rutas sitio web

app.get('/login', loginController.index);
app.post('/login', loginController.postAPI);
app.get('/password', passwordController.index)
app.post('/password', passwordController.putAPI)
app.post('/update', updateUserController.updateUser)

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    // Return error API signup
  if (req.originalUrl.startsWith('/api/v1/signup')){
    if (err.array){
        const errorInfo = err.errors[0];
        err.message = `${errorInfo.msg} `  
        err.status = 400 
      }

    res.json(err);
    return;
  }

  // Return a JSON error about API travels methods.

  if (req.originalUrl.startsWith('/api/travels')){
    res.json({ error: err.message });
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

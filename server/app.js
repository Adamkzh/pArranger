var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var saveData = require('./routes/saveData');
var getData = require('./routes/getData');
var jsonRoutes = require('./routes/jsonRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/', indexRouter);
app.post('/api/save', saveData);
app.get('/api/get',getData);
app.get('/api/getall',getData);

app.get('/api/v1/getUsers', jsonRoutes);
app.get('/api/v1/searchUsers', jsonRoutes);
app.get('/api/v1/getUser', jsonRoutes);
app.post('/api/v1/addUser', jsonRoutes);
app.post('/api/v1/updateUser', jsonRoutes);
app.post('/api/v1/removeUser', jsonRoutes);

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
});

module.exports = app;

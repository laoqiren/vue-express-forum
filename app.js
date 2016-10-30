var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);

var log = require('./routes/log');
var routes = require('./routes/index');
var logout = require('./routes/logout');
var reg = require('./routes/reg');
var post = require('./routes/post');
//var posts = require('./routes/users');
var user = require("./routes/user");

var app = express();
/*
app.use(session({
  secret:settings.cookieSecret,
  key:settings.db,
  cookie:{
    maxAge:1000 * 60 * 60 * 24 * 30
  },
  store:new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port
  })
}));
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwtTokenSecret',"LuoXia");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'dist')));

app.all("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use('/', routes);
app.use("/user",user);
app.use('/reg',reg);
app.use('/log',log);
//app.use('/logout',logout);
app.use('/post',post);
//app.use('/posts',posts);
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

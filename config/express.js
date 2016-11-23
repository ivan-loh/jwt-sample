'use strict';

const methodOverride = require('method-override');
const favicon        = require('serve-favicon');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const compress       = require('compression');
const jwt            = require('express-jwt');
const express        = require('express');
const logger         = require('morgan');
const glob           = require('glob');


module.exports = function (app, config) {


  const env                  = process.env.NODE_ENV || 'development';
  app.locals.ENV             = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';


  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');
  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(jwt({secret: config.secret}).unless({path: ['/login', '/']}));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());


  glob
    .sync(config.root + '/app/controllers/*.js')
    .forEach(controller => {
      require(controller)(app);
    });

  app.use(function (req, res, next) {
    const err  = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });


  return app;
};

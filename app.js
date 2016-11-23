'use strict';

const express  = require('express');
const config   = require('./config/config');
const glob     = require('glob');
const mongoose = require('mongoose');


/**
 * Database
 */
mongoose.connect(config.db);
mongoose
  .connection
  .on('error', () => {
    throw new Error('unable to connect to database, ' + config.db);
  });

glob
  .sync(config.root + '/app/models/*.js')
  .forEach(model => require(model));


/**
 * Server Startup
 */
const app      = express();
module.exports = require('./config/express')(app, config);

app.listen(
  config.port,
  () => console.log('Express server listening on port ' + config.port)
);


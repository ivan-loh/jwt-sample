'use strict';

const glob     = require('glob');
const async    = require('async');
const mongoose = require('mongoose');
const config   = require('./config/config');

mongoose.connect(config.db);
mongoose
  .connection
  .on('error', () => {
    throw new Error('unable to connect to database, ' + config.db);
  });

glob
  .sync(config.root + '/app/models/*.js')
  .forEach(model => require(model));


const User = mongoose.model('User');

async
  .parallel([

    (done) => {

      const username    = 'admin';
      const password    = 'password';
      const permissions = [
        'admin',
        'api:read',
        'api:write'
      ];
      new User({username, password, permissions})
        .save(done);
    },

    (done) => {

      const username    = 'user';
      const password    = 'password';
      const permissions = [
        'api:read',
        'api:write'
      ];

      new User({username, password, permissions})
        .save(done);
    }

  ], () => {
    mongoose.connection.close();
  });




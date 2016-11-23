var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'jwt-sample'
    },
    secret: 'something something witty',
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/jwt-sample-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'jwt-sample'
    },
    secret: 'something something witty',
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/jwt-sample-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'jwt-sample'
    },
    secret: 'something something witty',
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/jwt-sample-production'
  }
};

module.exports = config[env];

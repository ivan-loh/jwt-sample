'use strict';

const jwt      = require('jsonwebtoken');
const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = mongoose.model('User');
const config   = require('../../config/config');
const SECRET   = config.secret;

module.exports = (app) => {
  app.use('/login', router);
};

router.post('/', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
             .status(400)
             .send('invalid request');
  }

  User
    .findOne({username}, (err, user) => {
      user
        .comparePassword(password, (error, isMatch) => {

          if (error)    { throw err; }
          if (!isMatch) {
            return res
                     .status(401)
                     .send('invalid credentials');
          }

          res
            .status(200)
            .jsonp(
              jwt.sign({
                user: username,
                permissions: user.permissions
              }, SECRET));
        });
    });
});

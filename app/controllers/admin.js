'use strict'

const guard   = require('express-jwt-permissions')();
const express = require('express');
const router  = express.Router();

module.exports = function (app) {
  app.use('/admin', router);
};

router.use(guard.check('admin'));

router.get('/ping', function (req, res, next) {
  res.jsonp('pong');
});

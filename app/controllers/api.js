'use strict';

const express = require('express');
const guard   = require('express-jwt-permissions')();
const router  = express.Router();

module.exports = function (app) {
  app.use('/api', router);
};

router.use(guard.check('api:read'));
router.use(guard.check('api:write'));

router.get('/', function (req, res, next) {
  res.jsonp({});
});

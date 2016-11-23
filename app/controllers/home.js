'use strict';

const express = require('express');
const router  = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.render('index', {});
});

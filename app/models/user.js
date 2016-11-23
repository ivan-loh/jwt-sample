'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');


const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  permissions: [String]
});


userSchema
  .pre('save', function (next) {

    const user       = this;
    const changePass = user.isModified('password');

    if (!changePass) { return next(); }

    bcrypt
      .genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt
          .hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
          });
      });

  });


userSchema
  .methods
  .comparePassword = function (password, next) {
    bcrypt
      .compare(password, this.password, (err, isMatch) => {
        if (err) { return next(err); }
        next(null, isMatch);
      });
  };


module.exports = mongoose.model('User', userSchema);

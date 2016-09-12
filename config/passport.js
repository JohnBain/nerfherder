var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/Users.js')

passport.use(new LocalStrategy({
    usernameField: 'email' //smarter to base it on emails instead of usernames 
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) { //searches DB for user with this address
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'  //no user, return message
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'  //wrong password, return message
        });
      }
      return done(null, user);
    });
  }
));


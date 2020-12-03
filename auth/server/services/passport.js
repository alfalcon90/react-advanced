const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

// Setup options for Local Strategy
const localOptions = {
  usernameField: 'email',
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify the email and pwd
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      done(null, false);
    }

    // Compare pwds
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(JwtOptions, (payload, done) => {
  // Check if user ID and payload exist in DB
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Hook up to Passport
passport.use(jwtLogin);
passport.use(localLogin);

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res, next) => {
  // User is already auth'd using Passport (user is passed via req.user)
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // Check existing users
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // Create new user record
    const user = new User({
      email,
      password,
    });

    // Save user record
    user.save((err) => {
      if (err) {
        return next(err);
      }

      // Respond to request
      res.json({ token: tokenForUser(user) });
    });
  });
};

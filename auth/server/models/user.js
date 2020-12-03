const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// Encrypt password

// Before saving model, run this function
userSchema.pre('save', function (next) {
  // Get access to user model. It's an instance to the user model.
  const user = this;

  // Generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // Hash password using salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Overwrite plain text pwd with hashed pwd
      user.password = hash;
      next();
    });
  });
});

// Compare hashed passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;

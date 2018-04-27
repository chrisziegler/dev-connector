const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// this 'users' cones from:
// module.exports = User = mongoose.model('users', UserSchema);
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// remember we passed in passport in server.js
// that's where this parameter comes from...
// jwt_payload was defined in routes/users
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      // Get the user identified by the token w/mongoose method
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            //handle the done async arg from promise
            // 1st arg here is for errors, n/a
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("../modle/userSchema")
passport.use(
  new GoogleStrategy(
    {
      clientID: '1011184896532-rujq6aq7vibcj2036qigsjk8u36la3rh.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google',
     
    },
    function (accessToken, refreshToken, profile, cb) {
    cb(null,profile)
    }
  ));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
 
    done(null, user);

});

module.exports = passport;

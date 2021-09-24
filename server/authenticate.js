const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: '521603210674-c3r17jn27bg4s5qefj4nnit2ccb2sj03.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:1337/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
  // register user here
  console.log(profile);
  cb(null, profile);
 
}
));

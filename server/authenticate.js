const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { User, Friends } = require('../db/index.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/google/callback'
},
function(accessToken, refreshToken, profile, done) { // this was cb
  console.log('is authenticate running');
  // not hitting the google oauth api


  // register user here
  const { sub, name, picture, email } = profile._json;
  
  User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      return null;
     

    } else {
      User.create(profile._json).then((/*newUser, done*/) => {
        console.log('all good!');
        // if (!newUser) {
        //   return done(null, false);
        // }
        // if (newUser) {
        //   return done(null, newUser);
        // }
      }).catch((err) => {
        console.log('Create Error:', err);
      });
    }
  }).catch((err) => {
    console.log('FindOne Err:', err);
  });
  console.log('google:', profile._json);
  done(null, profile);
 
}
));

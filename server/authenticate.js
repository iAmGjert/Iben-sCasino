const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { User, Friends } = require('../db/index.js');

passport.serializeUser((user, done) => {
  //console.log('serialize:', user);
  // console.log('sub:', user.id);
  // console.log('serializeUser', user.id);
  done(null, user.id); 
});


passport.deserializeUser(( id, done) => { 
  
  User.findOne({
    where: { 
      id: id 
    }
  })
    .then((id) => {
      if (id) {
        done(null, id);
      }
    
    }).catch((err) => {
      console.log('Error deserial:', err);
    });
    
}); 


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/google/callback' //this should not be hardcoded
},
function(accessToken, refreshToken, profile, done) { // this was cb
 
  // not hitting the google oauth ap

  // register user here
  const { sub, name, picture, email } = profile._json;
  
  User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      return done(null, user);
     

    } else {

      User.create(profile._json).then((newUser) => {
       
        return done(null, newUser);
       
       
      }).catch((err) => {
        console.log('Create Error:', err);
        return;
      });
    }
  }).catch((err) => {
    console.log('FindOne Err:', err);
  });
 
}
));


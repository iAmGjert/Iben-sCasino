const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { User, Friends } = require('../db/index.js');

passport.serializeUser((user, done) => {
  //console.log('serialize:', user);
  // console.log('sub:', user.id);
  done(null, user.id); 
});

passport.deserializeUser((user, id, done) => { 
  //console.log('deserial:', id);
  
  User.findOne({
    where: { 
      sub: id 
    }}/*, (err, user) => { 
    console.log('deserial err;', err);
    done(err, user);
  }*/)
    .then((id) => {
      if (id) {
        //console.log('user.sub:', id);
        done(null, id);
      }
    
    }).catch((err) => {
      console.log('Error deserial:', err);
    });
    
}); 


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/google/callback'
},
function(accessToken, refreshToken, profile, done) { // this was cb
 
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
        
       
      }).catch((err) => {
        console.log('Create Error:', err);
      });
    }
  }).catch((err) => {
    console.log('FindOne Err:', err);
  });
  // console.log('google:', profile._json);
  done(null, profile);
 
}
));

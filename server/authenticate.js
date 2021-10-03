const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const { User, Friends } = require('../db/index.js');

passport.serializeUser((user, done) => {
 
  done(null, user.id); 
});


passport.deserializeUser((id, done) => { 
  
  User.findOne({
    where: { 
      id: id 
    }
  })
    .then((user) => { //id
      // if (id) {
      done(null, user); //id
      // }
    
    }).catch((err) => {
      console.log('Error deserial:', err);
    });
    
}); 


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
  callbackURL: '/google/callback'//'http://localhost:1337/google/callback' //this should not be hardcoded
=======
  callbackURL: '/google/callback' 
>>>>>>> main
},
function(accessToken, refreshToken, profile, done) { 

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


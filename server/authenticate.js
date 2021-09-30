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
  console.log('deserial:', id);
  
  User.findOne({
    where: { 
      id: id 
    }
  })
    .then((id) => {
      if (id) {
      //  console.log('then id:', id);
        // return null
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
  console.log('inside google strategy');

  // register user here
  const { sub, name, picture, email } = profile._json;
  
  User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (user) {
      console.log('is user');
      return done(null, user);
      //  return null
     

    } else {
      console.log('create');
      User.create(profile._json).then((newUser) => {
        console.log('create');
       
        return done(null, newUser);
       
       
      }).catch((err) => {
        console.log('Create Error:', err);
        return;
      });
    }
  }).catch((err) => {
    console.log('FindOne Err:', err);
  });
  // console.log('google:', profile._json);
  //console.log('i am here');
  // done(null, profile);
 
}
));

// const passport = require ('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();

// const { User, Friends } = require('../db/index.js');

// // passport.serializeUser((user, done) => {
// //   //console.log('serialize:', user);
// //    console.log('inside serialize sub:', user.sub);
// //  // done(null, user.sub); 
// // });

// // passport.deserializeUser((user, id, done) => { 
// //   //console.log('deserial:', id);
// //   console.log('deserialize usersub', user.sub)
  
// //   User.findOne({
// //     where: { 
// //       sub: id 
// //     }}/*, (err, user) => { 
// //     console.log('deserial err;', err);
// //     done(err, user);
// //   }*/)
// //     .then((id) => {
// //       if (id) {
// //         console.log('deserialize user.sub:', id);
// //         done(null, id);
// //       }
    
// //     }).catch((err) => {
// //       console.log('Error deserial:', err);
// //     });
    
// // }); 


// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:1337/google/callback'
// },
// function(accessToken, refreshToken, profile, done) { // this was cb
 
//   // not hitting the google oauth api


//   // register user here
//   const { sub, name, picture, email } = profile._json;
  
//   User.findOne({
//     where: {
//       email: email
//     }
//   }).then((user) => {
//     if (user) {
//       console.log('user here already')
//       //done(null, user)
//      return null;
     

//     } else {
//       console.log('else')
//       User.create(profile._json).then((newUser) => {
//         console.log('new user');
//         done(null, newUser);
       
//       }).catch((err) => {
//         console.log('Create Error:', err);
//       });
//     }
//   }).catch((err) => {
//     console.log('FindOne Err:', err);
//   });
//   // console.log('google:', profile._json);
//   //done(null, profile);
 
// }
// ));

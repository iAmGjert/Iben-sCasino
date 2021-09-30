const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
//const cookieSession = require('cookie-session');
//const cookieParser = require('cookie-parser');
const passport = require('passport');
const authenticate = require('./authenticate.js');
const { Data } = require('./routes/userDatabase');
//const {CLIENT_ID} = require('../config.js');
require('dotenv').config();
const { ClientId } = require('./routes/clientId');
const blj = require('./routes/blackjack');
const {Profile} = require('./routes/profile');
/* inititilize cookies 
,
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


*/
const port = 1337;
app.use(express.json());

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [process.env.SESSION_SECRET]
// }));

const frontend = path.resolve(__dirname, '..', 'client', 'dist');


app.use(express.static(frontend));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true

})); // does app.use(express.json()) need to be in here.
app.use(passport.initialize());
app.use(passport.session());

app.use('/routes/clientId', ClientId);
app.use('/routes/blackjack', blj.Blackjack);
app.use('/routes/userDatabase', Data);
app.use('/routes/profile', Profile);

app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), (req, res) => {
  //console.log('req.user:', req.user, 'req.cookie', req.cookie, 'req.sesh', req.session);
});
 
  

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', }),
  function(req, res, next) {
    console.log( 'req.user', req.user);
    // Successful authentication, redirect home.
    // res.redirect('/blackjack');// --> to the main game page
    res.redirect('/profile');
    // res.sendStatus(201)
    
    
    // res.send(req.user);
  });




app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontend, 'index.html'));
  
});

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});


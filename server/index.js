const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const authenticate = require('./authenticate.js');
const { Data } = require('./routes/userDatabase');
//const {CLIENT_ID} = require('../config.js');
require('dotenv').config();
const { ClientId } = require('./routes/clientId');
const blj = require('./routes/blackjack');
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
app.use(cors());
app.use(express.json());

const frontend = path.resolve(__dirname, '..', 'client', 'dist');
app.use('/routes/clientId', ClientId);
app.use('/routes/blackjack', blj.Blackjack);
app.use('/routes/userDatabase', Data);

app.use(express.static(frontend));
app.use(session({secret: process.env.SESSION_SECRET})); // does app.use(express.json()) need to be in here.
app.use(passport.initialize());
app.use(passport.session());
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}), (req, res) => {
  //console.log('req.user:', req.user);
});
 
  

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //console.log('session:', req.session);
    // Successful authentication, redirect home.
    res.redirect('/blackjack');// --> to the main game page
    
    //res.send('Logged In!');
  });


app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontend, 'index.html'));
  
});

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});


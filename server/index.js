const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const passport = require('passport');
const authenticate = require('./authenticate.js');
const { Data } = require('./routes/userDatabase');
//const {CLIENT_ID} = require('../config.js');
require('dotenv').config();
const { ClientId } = require('./routes/clientId');
const blj = require('./routes/blackjack');

const port = 1337;
app.use(cors({origin: 'http://localhost:1337'}));
app.use(express.json());

const frontend = path.resolve(__dirname, '..', 'client', 'dist');

app.use('/routes/blackjack', blj.Blackjack);
app.use('/routes/userDatabase', Data);
app.use('/routes/clientId', ClientId);
app.use(express.static(frontend));

app.use(passport.initialize());
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/'); --> to the main game page
    res.send('Logged In!');
  });


app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontend, 'index.html'));
  
});

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});


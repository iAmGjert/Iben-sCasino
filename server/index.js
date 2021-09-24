const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const authenticate = require('./authenticate.js');
const port = 1337;

const frontend = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.static(frontend));

// app.use('/', router of some kind)
// app.use('/users, a different router)

app.use(passport.initialize());
app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/'); --> to the main game page
    res.send('Logged In!');
  });

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});


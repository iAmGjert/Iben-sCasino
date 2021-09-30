const Profile = require('express').Router();

Profile.get('/user', async (req, res) => {
  console.log('PROFILE GET');

  //req.user is provided with the serialize/deserialize sessions

  //console.log('REQ USER', req.user);

  //console.log(req.session);
  // console.log(req.session.passport.user)
  if(req.user) {
    res.status(201).send(req.user.name);
  } else {
    res.status(201).send('anon')
  }
  
});

module.exports = {Profile};
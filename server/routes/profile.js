const Profile = require('express').Router();

Profile.get('/', (req, res) => {
  console.log('PROFILE GET');
  console.log('REQ USER', req.user);
  //console.log(req.session);
  // console.log(req.session.passport.user)
  res.send(req.user.name);
});

module.exports = {Profile};
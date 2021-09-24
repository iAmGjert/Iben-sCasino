const { User, Friends } = require('./db/index.js');
const { Router } = require('express');
const { Data } = Router(); //not sure what goes in here...

// still developing sequelize database request structure
Data.get('/users', (req, res) => {
  Users.findAll().then((results) => {
    console.log(results);
    res.sendStatus(200).send(results);
  }).catch((err) => {
    console.log('User Get Data:', err);
    res.status(404);
  });
});




Data.post('/users', (req, res) => {
  console.log(req.body.name);
  const { name } = req.body;
  Users.create({name: name }).then(() => {
    //console.log(results);
    res.sendStatus(201);
  }).catch((err) => {
    console.log('User Post Data:', err);
    res.status(404);
  });
});

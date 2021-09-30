const { User, Friends } = require('../../db/index.js');
const { Router } = require('express');
const Data = Router(); //not sure what goes in here...

// still developing sequelize database request structure
Data.get('/user', (req, res) => {
 
  User.findAll().then((results) => {
  //  console.log('req:', req.body, 'results:', results);
    res.status(200).send(results);
  }).catch((err) => {
    console.log('User Get Data:', err);
    res.status(500);
  });
});



// does this need to be /google?
Data.post('/user', (req, res) => {
 // console.log(req.body.name);
  const { name } = req.body;
  User.create({name: name }).then(() => {
   // console.log('req:', req.body, 'results:', results);
    res.sendStatus(201);
  }).catch((err) => {
    console.log('User Post Data:', err);
    res.status(404);
  });
});


Data.get('/friends', (req, res) => {
  Friends.findAll().then((results) => {
   // console.log(results);
    res.sendStatus(200).send(results);
  }).catch((err) => {
    console.log('Friends Get Data:', err);
    res.status(404);
  });
});




Data.post('/friends', (req, res) => {
  // console.log(req.body.name);
  //we need the id of the current user who is adding the friend
  //and we need the id of the freind that we are adding 
  const { user } = req.body;
  const currentUser = req.user;
  let updateUser;
  
  User.findOne({ where: { id: currentUser.id } }).then(currentU => {
    // console.log(`DATA!!`, currentU)
    updateUser = currentU;
    Friends.create(user)
      .then((user) => {
   
        return updateUser.addFriends(user);
      });
    res.sendStatus(201);
  })
    .catch((err) => {
      console.log('Friends Post Data:', err);
      res.status(404);
    });
});

Data.patch('/friends/:id', (req, res) => {
  const { id } = req.params;
  const { users } = req.body; 

  User.update(users, { where: { id: id }})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.status(404);
    });
});


module.exports = { Data };

/**const { User, Friends } = require('../../db/index.js');
const { Router } = require('express');
const Data = Router(); //not sure what goes in here...

// still developing sequelize database request structure
Data.get('/user', (req, res) => {
 
  User.findAll().then((results) => {
    console.log('req:', req.body, 'results:', results);
    res.status(200).send(results);
  }).catch((err) => {
    console.log('User Get Data:', err);
    res.status(500);
  });
});



// does this need to be /google?
Data.post('/user', (req, res) => {
  console.log(req.body.name);
  const { name } = req.body;
  User.create({name: name }).then(() => {
    console.log('req:', req.body, 'results:', results);
    res.sendStatus(201);
  }).catch((err) => {
    console.log('User Post Data:', err);
    res.status(404);
  });
});


Data.get('/friends', (req, res) => {
  Friends.findAll().then((results) => {
    console.log(results);
    res.sendStatus(200).send(results);
  }).catch((err) => {
    console.log('Friends Get Data:', err);
    res.status(404);
  });
});




Data.post('/friends', (req, res) => {
  // console.log(req.body.name);
  const { friends } = req.body;
  let user;
  User.findOne({ where: { name: "Tre'von Mitchell" } }).then(data => {
    //console.log(results);
    user = data;
    Friends.create(friends)
    .then((friend) => {
   
      return user.addFriends(friend)
     })
     res.sendStatus(201);
  })
  .catch((err) => {
    console.log('Friends Post Data:', err);
    res.status(404);
  });
});

Data.patch('/friends/:id', (req, res) => {
    const { id } = req.params;
    const { users } = req.body; 

User.update(users, { where: { sub: id }})
.then(() => {
  res.sendStatus(201);
})
.catch(err => {
  console.log(err);
  res.status(404);
})
})


module.exports = { Data };
*/
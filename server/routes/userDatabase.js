const { User, Friends } = require('../../db/index.js');
const { Router } = require('express');
const Data = Router(); //not sure what goes in here...

// still developing sequelize database request structure
Data.get('/users', (req, res) => {
//  let recentUsers;
  User.findAll({limit: 5, order: [['id', 'DESC']]}).then((results) => {
  //  console.log('req:', req.body, 'results:', results);
    res.status(200).send(results);
  }).catch((err) => {
    console.log('User Get Data:', err);
    res.status(500);
  });
});


Data.put('/users/:id', (req, res) => {
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


Data.get('/users/leaderboard', (req, res) => {
  User.findAll().then((results) => {
    //  console.log('req:', req.body, 'results:', results);
  //  console.log(results);
    res.status(200).send(results);
  }).catch((err) => {
    console.log('User Get Data:', err);
    res.status(500);
  });
});

Data.get('/:user', (req, res) => {
  const { user } = req.params;
  User.findAll({ where: { name: user } })
    .then(user => {
    // console.log(user);
      res.status(200).send(user);
    })
    .catch(err => {
      console.log(err);
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


Data.get('/friends/:id', (req, res) => {
  const { id } = req.params;
  // let userArr = [];
  Friends.findAll({ where: { UserId: id }}).then((results) => {
    
    res.status(200).send(results);
    
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
    updateUser = currentU;
    Friends.create({ friends: user.name })
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

//delete a friend by id when the user is clicked on the following button to unfollow
Data.delete('/friends/:id', (req, res) => {
  const { id } = req.params;
  Friends.destroy({ where: { id: id }})
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
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


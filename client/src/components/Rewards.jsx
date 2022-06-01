import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Rewards = ({ initUser }) => {

  const [user, setUser] = useState(initUser)

  const getProfile = () => {
    axios.get('/routes/profile/user')
      .then(user => {
        setUser(user.data)
      })
      .catch((err => console.log('getprof err', err)));
  }

  const updateUser = () => {
    axios.put(`/routes/userDatabase/users/${initUser[0]}`, {
      users: {
        money: initUser[5] + 200
      }
    })
    .then(() => {
      // console.log('put worked');
    })
    .catch((err) => {
      console.error(err);
    })
  }

  // useEffect(() => {
  //   updateUser();
  //   getProfile();
  // }, []);

console.log(user);


  return (
    <h3>
      <div>
        {
          user.money === 9600 ? <Link to='/rewards'><button className='rewardButton'>New Reward!</button></Link> : ''
        }
        </div>
      <div>Welcome back!</div>
      <div>As a thank you, $200 has been added to your account!</div>
      <div>
        {
          user.money > 9600 ? <Link to='/rewards'><button className='rewardButton'>Check Rewards</button></Link> : ''
        }
      </div>
    </h3>
  )
}


export default Rewards;

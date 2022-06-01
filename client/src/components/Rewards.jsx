import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import RewardsPage from './RewardsPage.jsx';

const Rewards = ({ user }) => {



  const updateUser = () => {
    axios.put(`/routes/userDatabase/users/${user[0][0]}`, {
      users: {
        money: user[0][5] + 200
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
  // }, []);

console.log(user);

  return (
    <h3>
      <div>
        {
          user[5] === 9600 ? <Link to='/rewards'><button className='rewardButton'>New Reward!</button></Link> : ''
        }
        </div>
      <div>Welcome back!</div>
      <div>As a thank you, $200 has been added to your account!</div>
      <div>
        {
          user[5] > 9600 ? <Link to='/rewards'><button className='rewardButton'>Check Rewards</button></Link> : ''
        }
      </div>
      <Router>
        <main>
          <Route path='/rewards' element={<RewardsPage user={user} />} />
        </main>
      </Router>
    </h3>
  )
}


export default Rewards;

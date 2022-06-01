import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePic from './ChangePic.jsx';

const RewardsPage = () => {

  const [user, setUser] = useState({})

  const getProfile = () => {
    axios.get('/routes/profile/user')
      .then(user => {
        setUser(user.data)
      })
      .catch((err => console.log('getprof err', err)));
  }

  useEffect(() => {
    getProfile();
  }, []);



  return (
    
    <div style={{textAlign: 'center'}}>
      <h1>{user.name}</h1>
      <h3>Current Money: ${user.money}</h3>
      <h1><img className='circle responsive-img z-depth-4' style={{width: 200}} src={`${user.picture}`} /></h1>
      <h2>You can now change your profile picture!</h2>
      <div><ChangePic user={user} getProfile={getProfile} /></div>
      </div>
  )
}


export default RewardsPage;

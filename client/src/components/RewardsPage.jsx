import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePic from './ChangePic.jsx';
import ChangeTheme from './ChangeTheme.jsx';

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

    <div>

      <div style={{textAlign: 'center'}}>
      <h2>{user.name}</h2>
      <h4>${user.money}</h4>
      <h4><img className='circle responsive-img z-depth-4' style={{width: 200}} src={`${user.picture}`} /></h4>
      </div>

      <h5>Rewards:</h5>
      <h6>You can now change your profile picture!</h6>
      <div style={{width: '400px', marginBottom: '50px'}}><ChangePic user={user} /></div>
      <h6>You can now change your theme!</h6>
      <div style={{width: '400px'}}><ChangeTheme user={user} /></div>

      </div>
  )
}


export default RewardsPage;

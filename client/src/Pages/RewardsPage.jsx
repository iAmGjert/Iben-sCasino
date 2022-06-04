import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePic from '../components/ChangePic.jsx';
import ChangeTheme from '../components/ChangeTheme.jsx';
import { themes } from '../theme-context.js';

const RewardsPage = () => {

  const [user, setUser] = useState({});

  const [theme, setTheme] = useState(themes.light);

  const [render, setRender] = useState(false);


  const getProfile = () => {
    axios
      .get('/routes/profile/user')
      .then((user) => {
        setUser(user.data);
        setTheme(user.data.theme === null ? themes.light 
          : user.data.theme === 'light' ? themes.light 
            : user.data.theme === 'dark' ? themes.dark 
              : themes.light);
      })
      .catch((err) => console.log('getprof err', err));
  };


  const toggleTheme = () => {
    axios.put(`/routes/userDatabase/users/${user.id}`, {
      users: {
        theme: user.theme === null ? 'dark' 
          : user.theme === 'dark' ? 'light' 
            : user.theme === 'light' ? 'dark' 
              : null
      }
    })
    .then(() => {
      reRender();
    })
  };

  const reRender = () => {
    setRender(!render);
  }

  useEffect(() => {
    getProfile();
  }, [render]);



  return (
    <div style={{...theme, minHeight: '100vh'}}>

      <div style={{ textAlign: 'center' }}>
        <h2>{user.name}</h2>
        <h4>${user.money}</h4>
        <h4>
          <img
            className='circle responsive-img z-depth-4'
            style={{ width: 200 }}
            src={`${user.picture}`}
          />
        </h4>
      </div>

      <div>
        {
          user.money >= 1400 ? <h5>Rewards:</h5> : ''
        }
      </div>

      <div style={{ width: '400px', marginBottom: '50px' }}>
        {
          user.money >= 1400 ? 
            <><h6>You can now change your profile picture!</h6><ChangePic user={user} /></> : <h6>Earn More Money To Earn Rewards</h6>
        }
      </div>

      <div style={{ width: '400px' }}>
        {
          user.money >= 1600 ?
            <><h6>You can now change your theme!</h6><ChangeTheme toggleTheme={toggleTheme} reRender={reRender} user={user} /></> : ''
        }
      </div>


    </div>
  );
};

export default RewardsPage;

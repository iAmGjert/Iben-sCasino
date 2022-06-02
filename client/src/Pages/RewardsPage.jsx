import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePic from '../components/ChangePic.jsx';
import ChangeTheme from '../components/ChangeTheme.jsx';
import ThemeContext, { themes } from '../theme-context.js';

const RewardsPage = () => {

  const [user, setUser] = useState({});

  const [theme, setTheme] = useState(themes.dark);

  const getProfile = () => {
    axios
      .get('/routes/profile/user')
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => console.log('getprof err', err));
  };


  const toggleTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
    } else {
      setTheme(themes.dark);
    }
  }


  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div style={theme}>

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
          user.money >= 8400 ? <h5>Rewards:</h5> : ''
        }
      </div>

      <div style={{ width: '400px', marginBottom: '50px' }}>
        {
          user.money >= 9000 ? 
          <><h6>You can now change your profile picture!</h6><ChangePic user={user} /></> : <h6>Earn More Money To Earn Rewards</h6>
        }
      </div>

      <div style={{ width: '400px' }}>
        {
          user.money >= 9400 ?
          <><h6>You can now change your theme!</h6><ChangeTheme toggleTheme={toggleTheme} user={user} /></> : ''
        }
      </div>


    </div>
  );
};

export default RewardsPage;

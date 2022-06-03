import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';
import { themes } from '../theme-context';


const RouletteGame = () => {
  //const redirect = Redirect();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          setTheme(data.data.theme === null ? themes.light 
            : data.data.theme === 'light' ? themes.light 
            : data.data.theme === 'dark' ? themes.dark 
            : themes.light);
          return data.data;
        }
      }); 
    
  }, []);
  return (
    <div className='rouletteComponent' style={theme}>
      <h1>Welcome to the roulette table!</h1>
      {
        user ?
          <span><RouletteWheel /><RouletteTable/><Button/></span> :
          <span>Please <Button href='/login'>Login</Button> to play.</span>
      }
    </div>
  );
};

export default RouletteGame;
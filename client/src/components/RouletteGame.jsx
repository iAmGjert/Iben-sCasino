import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';
import { Redirect } from 'react-router-dom';


const RouletteGame = () => {
  //const redirect = Redirect();
  console.log('Roulette Game');
  const [user, setUser] = useState(null);
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          console.log(data.data);
          return data.data;
        }
      }); 
    
  }, []);
  return (
    <div className='welcome'>
      <h1>Welcome to the roulette table!</h1>
      <span>
        {
          user ?
            <span><RouletteWheel /><RouletteTable/><Button/></span> :
            <span>Please <Button href='/login'>Login</Button> to play.</span>
        }
      </span>
    </div>
  );
};

export default RouletteGame;
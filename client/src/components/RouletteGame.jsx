import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';


const RouletteGame = () => {
  //const redirect = Redirect();
  const [user, setUser] = useState(null);
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          return data.data;
        }
      }); 
    
  }, []);
  return (
    <div className='rouletteComponent'>
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
import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';


const RouletteGame = () => {
  //const redirect = Redirect();
  const [user, setUser] = useState(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          return data.data;
        }
      }); 
    
  }, []);
  const handleClick = () => {
    setReadyToPlay(!readyToPlay);
  };
  return (
    <div className='rouletteComponent'>
      <h1>Welcome to the roulette table!</h1>
      {
        user ?
          <div>{ readyToPlay ? <RouletteWheel handleClick={handleClick} /> : <RouletteTable/> } { <Button variant='contained' onClick={handleClick}>{ readyToPlay ? 'Back to table for bets' : 'To the wheel for spin' }</Button> }</div> :
          <span>Please <Button variant='contained' href='/login'>Login</Button> to play.</span>
      }
    </div>
  );
};

export default RouletteGame;
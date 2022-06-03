import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';


const RouletteGame = () => {
  //const redirect = Redirect();
  const [user, setUser] = useState(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [bets, setBets] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const [betString, setBetString] = useState('No bets');
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          return data.data;
        }
      }); 
    
  }, []);
  let count = 0;
  const handleClick = () => {
    count++;
    readyToPlay ? setBets({}) : null;
    setReadyToPlay(!readyToPlay);
    //console.log(betString);
  };
  const [displayBets, setDisplayBets] = useState(bets.toString());
  useEffect(()=>{
    console.log(bets);
  }, [bets]);
  return (
    <div className='rouletteComponent'>
      <h1>Welcome to the roulette table!</h1>
      {
        user ?
          <div><div>{`${user.name}'s money: $${user.money}`}</div><div>Current bets: {bets && Object.entries(bets).map((bet)=><p>{bet}</p>)}</div>{ readyToPlay ? <RouletteWheel /> : <RouletteTable bets={bets} setBets={setBets}/> } { <Button variant='contained' onClick={handleClick}>{ readyToPlay ? 'Back to table for bets' : Object.keys(bets).length > 0 ? 'To the wheel for spin' : 'Place your bets'}</Button> }</div> :
          <span>Please <Button variant='contained' href='/login'>Login</Button> to play.</span>
      }
    </div>
  );
};

export default RouletteGame;
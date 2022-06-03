import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';


const RouletteGame = () => {
  const [user, setUser] = useState(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [bets, setBets] = useState({});
  const [totalBets, setTotalBets] = useState(0);
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
    readyToPlay ? setBets({}) : null;
    setReadyToPlay(!readyToPlay);
  };
  useEffect(()=>{
    let total = 0;
    for (const bet in bets) {
      total += bets[bet];
    }
    setTotalBets(total);
  }, [Object.values(bets)]);
  return (
    <div className='rouletteComponent'>
      <h1>Welcome to the roulette table!</h1>
      <h4>All bets are in increments of $5! Good luck!</h4>
      {
        user ?
          <div>
            <div>
              {`${user.name}'s money: $${user.money}`}
            </div>
            <div>
              <div>
                Current bets: {
                  Object.values(bets).some((bet)=>bet > 0) ?
                    Object.entries(bets).map((bet, index)=>
                      <p key={`bet#${index}`}>
                        {
                          bet[1] > 0 ?
                            `Space: ${bet[0]} Bet: $${bet[1]}` :
                            ''
                        }
                      </p>) :
                    'No Bets'
                }
              </div>
              <div>
                Current total bets: ${totalBets}
              </div>
            </div>
            { readyToPlay ? 
              <RouletteWheel bets={bets} totalBets={totalBets}/> : 
              <RouletteTable bets={bets} setBets={setBets}/>
            } 
            { 
              <Button variant='contained' disabled={Object.values(bets).some((bet)=>bet > 0) ? false : true} onClick={handleClick}>
                { readyToPlay ?
                  'Back to table for bets' : 
                  Object.values(bets).some((bet)=>bet > 0) ?
                    'To the wheel for spin' : 
                    'Place your bets'
                }
              </Button> 
            }
          </div> :
          <span>
            Please <Button variant='contained' href='/login'>Login</Button> to play.
          </span>
      }
    </div>
  );
};

export default RouletteGame;
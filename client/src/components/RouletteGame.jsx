import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';
import axios from 'axios';
import { Button } from '@mui/material';
import { themes } from '../theme-context';


const RouletteGame = () => {
  const [gameOver, setGameOver] = useState(false);
  const [user, setUser] = useState(null);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [bets, setBets] = useState({});
  const [totalBets, setTotalBets] = useState(0);
  const [betChanged, setBetChanged] = useState(false);
  const [userMoney, setUserMoney] = useState(0);
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
  const handleClick = () => {
    readyToPlay ? setBets({}) : null;
    setReadyToPlay(!readyToPlay);
    if (readyToPlay) {
      setBets({});
      setTotalBets(0);
      setUserMoney(user.money);
      setBetChanged(!betChanged);
      setGameOver(false);
    }
  };
  useEffect(()=>{
    let total = 0;
    for (const bet in bets) {
      total += bets[bet];
    }
    setTotalBets(total);
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUserMoney(data.data.money);
        }
      });  
  }, [betChanged]);
  return (
    <div className='rouletteComponent' style={theme}>
      <h1>Welcome to the roulette table!</h1>
      <h4>All bets are in increments of $5! Good luck!</h4>
      {
        user ?
          <div className='rouletteTable/Wheel'>
            <div className='currUserAndMoney'>
              {`${user.name}'s money: $${userMoney}`}
            </div>
            { readyToPlay ? 
              <RouletteWheel bets={bets} totalBets={totalBets} user={user} setBetChanged={setBetChanged} betChanged={betChanged} gameOver={gameOver} setGameOver={setGameOver}/> : 
              <RouletteTable bets={bets} setBetChanged={setBetChanged} setBets={setBets} betChanged={betChanged} userMoney={userMoney} totalBets={totalBets}/>
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
            <div className='currAndTotalBets'>
              <div className='currBets'>
                <h1>Current bets:</h1> {
                  Object.values(bets).some((bet)=>bet > 0) ?
                    Object.entries(bets).map((bet, index)=>
                      <span display='block' key={`bet#${index}`}><b>
                        {
                          bet[1] > 0 ?
                            `Space: ${bet[0]} Bet: $${bet[1]}` :
                            ''
                        }
                       | </b></span>) :
                    <i>No bets yet</i>
                }
              </div>
              <div className='totalBets'>
                <b>Current total bets: ${totalBets}</b>
              </div>
            </div>
          </div> :
          <span>
            Please <Button variant='contained' href='/login'>Login</Button> to play.
          </span>
      }
    </div>
  );
};

export default RouletteGame;

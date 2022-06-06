import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import BetIncrements from './BetIncrements.jsx';

const RouletteTable = ( {bets, setBets, setBetChanged, betChanged, userMoney, totalBets} ) => {
  const [betAmount, setBetAmount] = useState(5);
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const otherOptions = ['1st 12', '2nd 12', '3rd 12', '1 - 18', '19 - 36', 'Even', 'Odd', 'Black', 'Red'];
  const addBet = (segment) => {
    if (totalBets + betAmount <= userMoney) {
      const tempObj = Object.assign(bets);
      tempObj[segment] ? tempObj[segment] += betAmount : tempObj[segment] = betAmount;
      setBets(tempObj);
      setBetChanged(!betChanged);
    } else {
      alert('You do not have enough money to place that bet.');
    }
  };
  const subBet = (segment) => {
    const tempObj = Object.assign(bets);
    tempObj[segment] - betAmount >= 0 ? tempObj[segment] -= betAmount : tempObj[segment] = 0;
    setBets(tempObj);
    setBetChanged(!betChanged);
  };
  return (
    <div>
      <div style={{ padding: '10px' }}>
        <BetIncrements bets={bets} setBets={setBets} betAmount={betAmount} betChanged={betChanged} setBetChanged={setBetChanged} setBetAmount={setBetAmount}/>
      </div>
      <Grid 
        container
        alignContent='center' 
        spacing={1}
        justifyContent='center'
        alignItems='center' 
      >
        
        {
          segments.sort((a, b)=>(parseInt(a) - parseInt(b))).map((segment, index)=>{
            return <Grid 
              container
              alignContent='center' 
              spacing={0}
              justifyContent='center'
              alignItems='center' 
              key={`segButton${index}`} 
              item xs={12} sm={6} md={3}
            >
              <div style={{
                display: 'flex'
              }}>
                
                
                <Button 
                  variant='contained'
                  onClick={ ()=>{ subBet(segment); } }
                  color='error'
                >
                  -
                </Button>
                <div style={{
                  width: '4rem',
                  background: 'white',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  userSelect: 'none'
                }}>{segment}</div>
                <Button 
                  variant='contained'
                  onClick={ () => { addBet(segment); } }
                  color='success'
                >
                  +
                </Button>
                
              </div>
            </Grid>;
          })
        }
        {
          otherOptions.map((option, index)=>{
            return <Grid 
              container
              alignContent='center' 
              spacing={0}
              justifyContent='center'
              alignItems='center' 
              key={`segButton${index}`} 
              item xs={12} sm={6} md={3}
            >
              <div style={{
                display: 'flex'
              }}>
                
                
                <Button 
                  variant='contained'
                  onClick={ ()=>{ subBet(option); } }
                  color='error'
                >
                  <b>-</b>
                </Button>
                <div style={{
                  width: '4rem',
                  background: 'white',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  userSelect: 'none'
                }}>{option}</div>
                <Button 
                  variant='contained'
                  onClick={ () => { addBet(option); } }
                  color='success'
                >
                  <b>+</b>
                </Button>
                  
                
              </div>
            </Grid>;
          })
        }
      </Grid>
    </div>
  );
};

export default RouletteTable;
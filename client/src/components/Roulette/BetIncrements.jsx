import React from 'react';
import { Button } from '@mui/material';

const BetIncrements = ({betChanged, setBetChanged, setBetAmount, betAmount, bets, setBets}) => {
  const bet1 = () => {
    setBetAmount(1);
    setBetChanged(!betChanged);
  };
  const bet5 = () => {
    setBetAmount(5);
    setBetChanged(!betChanged);
  };
  const bet25 = () => {
    setBetAmount(25);
    setBetChanged(!betChanged);
  };
  const bet100 = () => {
    setBetAmount(100);
    setBetChanged(!betChanged);
  };
  const betReset = () => {
    setBets({});
    setBetChanged(!betChanged);
  };
  return (
    <div>
      <div>
        Current Bet Increment:
        <span style={{ padding: '10px' }}>
          {
            `$${betAmount}`
          }
        </span>
      </div>
      <div>
        Bet Increments: 
        <span style={{ padding: '10px' }}>
          <Button variant='contained' onClick={() => { bet1(); }}>$1</Button>
          <Button variant='contained' onClick={() => { bet5(); }}>$5</Button>
          <Button variant='contained' onClick={() => { bet25(); }}>$25</Button>
          <Button variant='contained' onClick={() => { bet100(); }}>$100</Button>
          <Button variant='contained' color='warning' 
            onClick={()=>{
              Object.values(bets).some((bet)=>bet > 0) ?
                confirm('Click "OK" to reset all current bets on the table.') ? 
                  betReset() : 
                  null :
                null;
            }}>Reset Bets</Button>
        </span>
      </div>
    </div>
  );
};

export default BetIncrements;

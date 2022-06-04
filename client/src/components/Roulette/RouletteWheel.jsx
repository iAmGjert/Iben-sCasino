import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import axios from 'axios';

const RouletteWheel = ({bets, totalBets, user, setBetChanged, betChanged}) => {
  const [winNum, setWinNum] = useState(null);
  const [firstRender, setFirstRender] = useState(true);
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const segColors = [
    'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'green', 'black', 'red', 'black',
    'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red'
  ];
  const onFinished = (winner) => {
    setWinNum(winner);
  };
  useEffect(()=>{
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    let totalWinnings = 0;
    for (const bet in bets) {
      if (bets[bet]) {
        if (winNum === bet) {
          totalWinnings += (bets[bet] * 35);
        }
      }      
    }
    totalWinnings - totalBets > 0 ?
      console.log(`Congradulations! You won $${totalWinnings - totalBets}!`) :
      console.log(`Better luck next time! You lost $${-(totalWinnings - totalBets)}!`);
    

    axios.put(`/routes/userDatabase/users/${user.id}`, {
      users: {
        money: user.money + (totalWinnings - totalBets)
      }
    })
      .then(()=>{
        setBetChanged(!betChanged);
      });
    
    
    
  }, [winNum]);
  
  
  return (
    <div>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment='00'// { nextWinner.toString() }
        onFinished={(winner) => onFinished(winner)}
        primaryColor='black'
        contrastColor='white'
        buttonText='Spin!'
        isOnlyOnce={true}
        size={290}
        upDuration={100}
        downDuration={1000}
        fontFamily='Arial'
      />
    </div>
  );
};


export default RouletteWheel;
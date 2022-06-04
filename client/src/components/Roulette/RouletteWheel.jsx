import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import axios from 'axios';

const RouletteWheel = ({bets, totalBets, user, setBetChanged, betChanged, userMoney}) => {
  const [total, setTotal] = useState(null);
  const [winNum, setWinNum] = useState(null);
  const [firstRender, setFirstRender] = useState(true);
  const segments = [
    '0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'
  ];
  const segColors = [
    'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'green', 'red', 'black', 'red',
    'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black'
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
          totalWinnings += (bets[bet] + (bets[bet] * 35));
        }
        if (bet === '1st 12' && parseInt(winNum) >= 1 && parseInt(winNum) <= 12) {
          totalWinnings += (bets[bet] + (bets[bet] * 2));
        }
        if (bet === '2nd 12' && parseInt(winNum) >= 13 && parseInt(winNum) <= 24) {
          totalWinnings += (bets[bet] + (bets[bet] * 2));
        }
        if (bet === '3st 12' && parseInt(winNum) >= 25 && parseInt(winNum) <= 36) {
          totalWinnings += (bets[bet] + (bets[bet] * 2));
        }
        if (bet === '1 - 18' && parseInt(winNum) >= 1 && parseInt(winNum) <= 18) {
          totalWinnings += (bets[bet] * 2);
        }
        if (bet === '18 - 36' && parseInt(winNum) >= 19 && parseInt(winNum) <= 36) {
          totalWinnings += (bets[bet] * 2);
        }
        if (bet === 'Even' && parseInt(winNum) % 2 === 0 && winNum !== '0' && winNum !== '00') {
          totalWinnings += (bets[bet] * 2);
        }
        if (bet === 'Odd' && parseInt(winNum) % 2 === 1 && winNum !== '0' && winNum !== '00') {
          totalWinnings += (bets[bet] * 2);
        }
        if (bet === 'Black') {
          if ((parseInt(winNum) >= 1 && parseInt(winNum) <= 10) || (parseInt(winNum) >= 19 && parseInt(winNum) <= 28)) {
            if (parseInt(winNum) % 2 === 0) {
              totalWinnings += (bets[bet] * 2);
            }
          } else if ((parseInt(winNum) >= 11 && parseInt(winNum) <= 18) || (parseInt(winNum) >= 29 && parseInt(winNum) <= 36)) {
            if (parseInt(winNum) % 2 === 1) {
              totalWinnings += (bets[bet] * 2);
            }
          }     
        }
        if (bet === 'Red') {
          if ((parseInt(winNum) >= 1 && parseInt(winNum) <= 10) || (parseInt(winNum) >= 19 && parseInt(winNum) <= 28)) {
            if (parseInt(winNum) % 2 === 1) {
              totalWinnings += (bets[bet] * 2);
            }
          } else if ((parseInt(winNum) >= 11 && parseInt(winNum) <= 18) || (parseInt(winNum) >= 29 && parseInt(winNum) <= 36)) {
            if (parseInt(winNum) % 2 === 0) {
              totalWinnings += (bets[bet] * 2);
            }
          }     
        }
      }      
    }
    setTotal(totalWinnings - totalBets);
    
    console.log('this is a log right before the axios request.');
    console.log('current user money: $' + user.money);
    console.log('totalBets: ' + totalBets);
    console.log('totalWinnings: $' + (totalWinnings - totalBets));
    console.log(`new total user money: $${userMoney + totalWinnings - totalBets}`);
    axios.put(`/routes/userDatabase/users/${user.id}`, {
      users: {
        money: userMoney + (totalWinnings - totalBets)
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
        winningSegment={segments[Math.floor(Math.random() * segments.length)]}
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
      {
        total !== null ? 
          total > 0 ?
            <div>
              {`Congradulations! You won $${total}`}
            </div> : 
            total === 0 ?
              <div>At least you didn't lose anything! Your bets evened out.</div> :
              <div>{`Better luck next time! You lost $${-total}`}</div> :
          <div>Good Luck!</div>
      }
    </div>
    
  );
};


export default RouletteWheel;
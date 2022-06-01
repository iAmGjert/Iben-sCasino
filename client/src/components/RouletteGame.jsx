import React from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import Profile from './Profile.jsx';


const RouletteGame = (props) => {
  console.log('Roulette Game');
  return (
    <div className='welcome'>
      <h1>Insert spinny roulette things and a table here</h1>
      <RouletteWheel
        user={'Me'}
      />
    </div>
  );
};

export default RouletteGame;
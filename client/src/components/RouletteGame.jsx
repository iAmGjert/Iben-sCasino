import React, {useState, useEffect} from 'react';
import RouletteWheel from './Roulette/RouletteWheel.jsx';
import RouletteTable from './Roulette/RouletteTable.jsx';


const RouletteGame = () => {
  console.log('Roulette Game');
  return (
    <div className='welcome'>
      <h1>Welcome to the roulette table!</h1>
      <span>
        <RouletteWheel
          user={ 'Me' }
        />
        <RouletteTable 
          user={ 'Me' }
        />
      </span>
    </div>
  );
};

export default RouletteGame;
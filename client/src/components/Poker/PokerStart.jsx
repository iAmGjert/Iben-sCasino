import React, { useState } from 'react';

const PokerStart = (props) => {
  const [monies, setMonies] = useState(0);

  const [buyIn, setBuyIn] = useState(50);

  const raiseBuyIn = () => {
    //have a lessthan money in the bank && before the next statement
    setBuyIn(buyIn + 50) //change the buy in to 100
  }
  const decreaseBuyIn = () => {
    buyIn && setBuyIn(buyIn - 50) //change the buy in to 100
  }

  const [bigBlind, setBigBlind] = useState(10);

  const raiseBigBlind = () => {
    bigBlind < .3 * buyIn && setBigBlind(bigBlind + 10);
  }
  const decreaseBigBlind = () => {
    bigBlind && setBigBlind(bigBlind - 10);
  }

  return (
    <div>
      <p> {buyIn}
        <button onClick={raiseBuyIn}>increase buy in</button> 
        <button onClick={decreaseBuyIn}>decrease buy in</button> 

      </p>
      <p> {bigBlind}
        <button onClick={raiseBigBlind}>increase big blind</button>
        <button onClick={decreaseBigBlind}>decrease big blind</button> 
      </p>
      <p>

      </p>
    </div>
  )
}


export default PokerStart; 
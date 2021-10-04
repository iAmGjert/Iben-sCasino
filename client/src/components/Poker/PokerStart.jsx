import React, { useState } from 'react';
import styled from 'styled-components';

const PokerStartStyled = styled.div`
  .chip {
    display: table-cell;
    border: 2px solid black;
    border-radius: 50%;
    height: 140px;
    width: 140px;
    font-size: 30px;
    color: white;
    background-color: #2e2b17;
    text-align: center;
    vertical-align: middle;

  }
`;

const PokerStart = ({changeView, setInitialMoney, userMoney, userName}) => {
  const [monies, setMonies] = useState(0);

  const [buyIn, setBuyIn] = useState(50);

  const raiseBuyIn = () => {
    //lessthan money in the bank - 50 && then set the buy in if that is true
    buyIn <= userMoney - 50 && setBuyIn(buyIn + 50); //change the buy in to 100
  };
  const decreaseBuyIn = () => {
    buyIn && setBuyIn(buyIn - 50); //change the buy in to 100
  };

  const [bigBlind, setBigBlind] = useState(10);

  const raiseBigBlind = () => {
    bigBlind < .3 * buyIn && setBigBlind(bigBlind + 10);
  };
  const decreaseBigBlind = () => {
    bigBlind && setBigBlind(bigBlind - 10);
  };

  const conditionalButton = () => {
    console.log('uername ', userName);
    if (userName) {
      return (
        <button 
          onClick={() => {
            setInitialMoney(buyIn, bigBlind);
            changeView('poker');
          }}>play poker!</button>
      );
    } else {
      return <h3>please log in!</h3>;
    }
  };


  return (
    <PokerStartStyled>
      <div>
        <div className="chip">{buyIn}</div>
        <button onClick={raiseBuyIn}>increase buy in</button> 
        <button onClick={decreaseBuyIn}>decrease buy in</button> 

      </div>
      <div> 
        <div className="chip">{bigBlind}</div>
        <button onClick={raiseBigBlind}>increase big blind</button>
        <button onClick={decreaseBigBlind}>decrease big blind</button> 
      </div>
      <div>
        {conditionalButton()}
      </div>
    </PokerStartStyled>
  );
};


export default PokerStart; 
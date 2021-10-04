import React from 'react';
import axios from 'axios';
import cardBack from '../images/cardBack.png';

//component holds the dealer cards.  only first card is face up, after game finishes all are turned up
const BlackjackDealer = (props) => {
  const {dealerHand, gameOver} = props;

  const hand = dealerHand.map((cardObj, i) => <img 
    key={cardObj.code} 
    height={170} 
    src={i === 0 ? cardObj.image : 
      gameOver ? cardObj.image : cardBack}/>);
  return (
    <div>
      <h3>Dealer Cards</h3>
      {hand}

   
    </div>
  );
};

export default BlackjackDealer;
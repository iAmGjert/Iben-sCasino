import React from 'react';
import cardBack from '../images/cardBack.png';

//displays dealers cards.  front only is displayed at end of game, otherwise is backs of cards
const DealerCards = ({dealerHand, gameOver}) => {

  return (
    <div>
      <h4>Dealer Cards</h4>
      {dealerHand.map((card, i) => <img src={gameOver ? card.image : cardBack} key={i} height={170}/>)}
    </div>
  );
};

export default DealerCards;
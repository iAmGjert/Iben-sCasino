import React from 'react';
import axios from 'axios';

const BlackjackDealer = (props) => {

  //console.log('bjd props', props);
  const {dealerHand} = props;
  // console.log('dh', dealerHand);
  const hand = dealerHand.map(cardObj => <img key={cardObj.code} height={100} src={cardObj.image}/>);
  return (
    <div>blackjack dealer
      {hand}
    </div>
  );
};

export default BlackjackDealer;
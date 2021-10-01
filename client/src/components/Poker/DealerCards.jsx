import React from 'react';

const DealerCards = ({dealerHand}) => {

  return (
    <div>dealer
      {dealerHand.map((card, i) => <img src={card.image} key={i} height={100}/>)}
    </div>
  );
};

export default DealerCards;
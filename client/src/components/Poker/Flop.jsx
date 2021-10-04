import React from 'react';

const Flop = ({flopHand, turn, river, }) => {

  return (
    <div> 
      <h4>Flop</h4>
      {flopHand.map((card, i) => <img src={card.image} key={i} height={170}/>)}
    </div>
  );
};

export default Flop;
import React from 'react';

/**
 * 
 * displays the flop (and turn and river).  i.e. this displays the communal cards
 */

const Flop = ({flopHand, }) => {

  return (
    <div> 
      <h4>Flop</h4>
      {flopHand.map((card, i) => <img src={card.image} key={i} height={170}/>)}
    </div>
  );
};

export default Flop;
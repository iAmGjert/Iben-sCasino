import React from 'react';

const Flop = ({flopHand}) => {

  return (
    <div> floppy flop flop
      {flopHand.map((card, i) => <img src={card.image} key={i} height={100}/>)}
    </div>
  );
};

export default Flop;
import React from 'react';

const BlackjackStart = (props) => {
  const {changeRender, placeBet} = props;
  return (
    <div>
      <button bet={5} onClick={()=> {
        changeRender('blackjack');
        placeBet(5);
      }}>place bet </button>
    </div>
  );
};

export default BlackjackStart;